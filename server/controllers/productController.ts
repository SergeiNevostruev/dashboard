import * as Hapi from '@hapi/hapi';
import crypto from 'crypto';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import { access, mkdir, rm } from 'fs/promises';
import path from 'path';
import Joi, { object, string } from 'joi';
import Boom from '@hapi/boom';
import moment from 'moment-timezone';
import { User } from '../entity/User';
import db from '../db';
import { Product } from '../entity/Product';
import config from '../config/config.json';
import { writePhotoFile } from './helpers';
import { Tegs } from '../entity/Tegs';

const { constants } = fs;

type NewProductType = {
    // userUuid: string;
    title: string;
    tel: number;
    teg: number;
    price: number;
    about: string;
    address: string;
    mapXY: {x: number, y: number};
    file: any
}

//  ==========================================================================
//  ==========================================================================
//  =============>> Здесь должен быть запрос координат <<=====================
//  ==========================================================================
//  ==========================================================================

const getMapXY = async (addres: string): Promise<NewProductType['mapXY']> => {
  console.log('получение координат ', addres);
  // const queryParams = `? geocode=${addres} & apikey=${config.mapkey} & format=json`;
  // const res: AxiosResponse = await axios(config.yaurl + queryParams);
  // console.log(res);
  return { x: 51, y: 52 };
};

// const products: any = async () => {
//   console.log('поиск объявлений');
//   try {
//     const data = await db.manager.find(Product);
//     // console.log(data);
//     return data;
//   } catch (e) {
//     console.log('ошибка ', e);
//     return { error: JSON.stringify(e) };
//   }
// };

const products: Hapi.Lifecycle.Method | Hapi.HandlerDecorations = async (
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) => {
  const countPage = await db.getRepository(Product).count();
  // парсинг квери запросов query = {page, tegs, count}
  const pageQuery = (Number(request.query.page) || 1) - 1;
  const countProductOnPage = Number(request.query.count) || 3;
  const productNumberPang = (countPage > countProductOnPage * pageQuery || countPage <= 0)
    ? pageQuery * countProductOnPage : countPage - countProductOnPage;

  let changeNaNtegs: boolean = false;
  // const tegstr = '1,2,3,4,5';
  const tegsQuery = request.query.tegs;
  const tegsDB = await db.manager.find(Tegs).catch();
  if (!tegsDB) return Boom.internal('Теги не найдены');
  const tegs = tegsQuery?.split(',').map((el: string) => {
    if (changeNaNtegs) return 0;
    if (Number.isNaN(Number(el))) {
      changeNaNtegs = true;
      return 0;
    }
    return Number(el);
  }) || tegsDB.map((i) => i.id);
  // const tegs = [1];
  if (Number.isNaN(countProductOnPage) || changeNaNtegs) return Boom.notFound('Неверный запрос');

  try {
    const data = await db
      .getRepository(Product)
      .createQueryBuilder()
      .select([
        'product.id',
        'product.title',
        'product.tel',
        'product.teg',
        'product.price',
        'product.about',
        'product.photoUrl',
        'product.address',
        'product.mapXY',
        'product.views',
        'product.tel',
        'product.userUuid',
        'product.createDate'])
      .from(Product, 'product')
      .where('product.teg IN (:...tegs)', { tegs })
      .offset(productNumberPang)
      .limit(countProductOnPage)
      .distinct(true)
      .orderBy('product.createDate', 'DESC', 'NULLS LAST')
      .getMany();

    return data.map((obj) => ({ ...obj,
      createDate: moment(obj.createDate)
        .tz('Europe/Moscow', true).format() }));
  } catch (e) {
    return Boom.internal('Неведома ошибка сервера');
  }
};

const schemaMultipart = Joi.object({
  // userUuid: Joi.string().required(),
  title: Joi.string().required(),
  tel: Joi.number().required(),
  teg: Joi.number().required(),
  price: Joi.number().required(),
  about: Joi.string().required(),
  address: Joi.string().required(),
});

const newProduct: Hapi.Lifecycle.Method | Hapi.HandlerDecorations = async (
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) => {
  // console.log('новое объявление ', request.auth.credentials.uuid);

  const { uuid } = request.auth.credentials;
  if (!uuid) {
    return { e: true, message: 'Нужна авторизация' };
  }
  const userUuid = uuid as string;
  const {
    // userUuid,
    title,
    tel,
    teg,
    price,
    about,
    address,
    mapXY,
    file
  } = request.payload as NewProductType;

  const validForm = schemaMultipart.validate({
    // userUuid,
    title,
    tel,
    teg,
    price,
    about,
    address
  });
  if (validForm.error) return { e: true, message: 'Некорректно заполнена форма' };
  const user = await db.manager.findOneBy(User, { uuid: userUuid });

  if (!user) return { e: true, message: 'Некорректный пользователь' };

  const product = new Product();
  product.userUuid = userUuid;
  product.title = title;
  product.tel = tel;
  product.teg = teg;
  product.price = price;
  product.about = about;
  product.address = address;
  product.mapXY = await getMapXY(address);
  product.user = user;

  const id = user.uuid;

  try {
    await access(
      path.join(config.fotofolder, `${id}`),
      constants.R_OK || constants.W_OK
    );
  } catch {
    await mkdir(path.join(config.fotofolder, `${id}`)).catch();
  }

  const photoUrlWriteJson = await writePhotoFile('', file, id);
  if (photoUrlWriteJson.e) {
    return photoUrlWriteJson;
  }
  product.photoUrl = photoUrlWriteJson.message;

  try {
    await db.manager.save(product);
    return { e: false, message: `${title} создан!`, product };
  } catch (e) {
    return { e: true, message: 'Ошибка сохранения объявления в базе данных' };
  }
};

const getProduct: Hapi.Lifecycle.Method | Hapi.HandlerDecorations = async (
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) => {
  const { uuid } = request.params as {uuid: string | undefined | null};

  if (!uuid) {
    return Boom.notFound('Неверный URL');
  }
  try {
    const user = await db.manager.findOneBy(Product, { uuid });
    const { about, address, mapXY, photoUrl, price, teg, tel, title, views } = user;
    user.views += 1; // ====> простой счетчик просмотров
    await db.manager.save(user).catch((e) => Boom.internal('Неведомая беда произошла на сервере'));
    return { about, address, mapXY, photoUrl, price, teg, tel, title, views };
  } catch (e) {
    return h.view('404').code(404);
  }
};

const delProduct: Hapi.Lifecycle.Method | Hapi.HandlerDecorations = async (
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) => {
  const uuidUrlProduct = request.params.uuid as string;
  const uuidUserToken = request.auth.credentials.uuid as string;
  if (!uuidUrlProduct) {
    return Boom.notFound('Такого объявления нет в Вашем аккаунте');
  }

  const delProduct = await db
    .manager
    .findOneBy(Product, { uuid: uuidUrlProduct, userUuid: uuidUserToken }).catch((e) => {
      Boom.notFound('Такого объявления нет в Вашем аккаунте');
    });

  if (delProduct) {
    const { title } = delProduct;
    await db.manager.remove(delProduct);
    console.log('Удален');
    return { e: false, message: `Объявление ${title} удалено` };
  }
  return Boom.notFound('Невозможно удалить. Такого объявления нет в Вашем аккаунте');
};

const putProduct: Hapi.Lifecycle.Method | Hapi.HandlerDecorations = async (
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) => {
  console.log(request.params.uuid, '  ', request.auth.credentials.uuid);
  const {
    title,
    tel,
    teg,
    price,
    about,
    address,
    mapXY,
    file
  } = request.payload as NewProductType;

  const uuidUrlProduct = request.params.uuid as string;
  const uuidUserToken = request.auth.credentials.uuid as string;

  if (!uuidUrlProduct) {
    return Boom.notFound('Такого объявления нет в Вашем аккаунте');
  }

  const putProduct = await db
    .manager
    .findOneBy(Product, { uuid: uuidUrlProduct, userUuid: uuidUserToken }).catch((e) => {
      Boom.notFound('Такого объявления нет в Вашем аккаунте');
    });

  if (!putProduct) {
    return Boom.notFound('Невозможно изменить объявления. Такого объявления нет в Вашем аккаунте');
  }

  const validForm = schemaMultipart.validate({
    // userUuid,
    title,
    tel,
    teg,
    price,
    about,
    address
  });
  if (validForm.error) return { e: true, message: 'Некорректно заполнена форма' };

  putProduct.title = title;
  putProduct.tel = tel;
  putProduct.teg = teg;
  putProduct.price = price;
  putProduct.about = about;
  putProduct.address = address;
  putProduct.mapXY = mapXY;

  const user = await db.manager.findOneBy(User, { uuid: uuidUserToken });

  if (!user) return { e: true, message: 'Некорректный пользователь' };

  const id = user.uuid;

  try {
    await access(
      path.join(config.fotofolder, `${id}`),
      constants.R_OK || constants.W_OK
    );
  } catch {
    await mkdir(path.join(config.fotofolder, `${id}`)).catch();
  }

  const photoUrlWriteJson = await writePhotoFile(putProduct.photoUrl, file, id);
  if (photoUrlWriteJson.e) {
    return photoUrlWriteJson;
  }
  putProduct.photoUrl = photoUrlWriteJson.message;

  try {
    await db.manager.save(putProduct);
    return { e: false, message: `${title} изменен! uuid: ${uuidUrlProduct} ====>`, putProduct };
  } catch (e) {
    return { e: true, message: 'Ошибка сохранения объявления в базе данных' };
  }

  // return 'PUT';
};

const tegsdefoults: Hapi.Lifecycle.Method | Hapi.HandlerDecorations = async (
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) => {
  const tegs = new Tegs();
  tegs.teg = 'Для дома';

  try {
    await db.manager.save(tegs);
    return tegs;
  } catch (e) {
    console.log(e);

    return { e: true, message: 'Ошибка тега в базе данных' };
  }
};

export default { products, newProduct, getMapXY, getProduct, delProduct, putProduct, tegsdefoults };
