import * as Hapi from '@hapi/hapi';
import crypto from 'crypto';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import { access, mkdir, rm } from 'fs/promises';
import path from 'path';
// import Joi from 'joi';
import Boom from '@hapi/boom';
import { User } from '../entity/User';
// import db from '../db';
import { Product } from '../entity/Product';
import config from '../config/config.json';

const validPassword = (password: string, salt: string, hash: string) => {
  const hashCheck = crypto.pbkdf2Sync(
    password,
    salt,
    1000,
    64,
    'sha512'
  ).toString('hex');
  return hashCheck === hash;
};

type photoHapiStrim = any;

const writePhotoFile = async (photoUrl: Product['photoUrl'], file: photoHapiStrim, id: User['uuid'],) => {
  const changeExp = (fileExp: string): boolean => (!(path.extname(fileExp) === '.jpg') && !(path.extname(fileExp) === '.jpeg'));
  const oldUrlPhoto: string[] | '' = photoUrl ? JSON.parse(photoUrl) : '';

  const result = [];
  const photoPaths = [];

  if (file) {
    if (file.length) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < file.length; i++) {
        if (changeExp(file[i].hapi.filename)) return { e: true, message: 'Некорректные расширения фотографий' };
        result.push(file[i].hapi);
        const uuidPhoto = crypto.randomUUID();
        const filePath = path.join(config.fotofolder, `${id}`, uuidPhoto + path.extname(file[i].hapi.filename));
        const urlPath = path.join(`${id}`, uuidPhoto + path.extname(file[i].hapi.filename));
        photoPaths.push(urlPath);
        file[i].pipe(fs.createWriteStream(filePath));
      }
    } else {
      if (changeExp(file.hapi.filename)) return { e: true, message: 'Некорректные расширения фотографий' };
      result.push(file.hapi);
      const uuidPhoto = crypto.randomUUID();
      const filePath = path.join(config.fotofolder, `${id}`, uuidPhoto + path.extname(file.hapi.filename));
      const urlPath = path.join(`${id}`, uuidPhoto + path.extname(file.hapi.filename));
      photoPaths.push(urlPath);
      file.pipe(fs.createWriteStream(filePath));
    }
  }
  console.log('старые урлы: /n', oldUrlPhoto, '/n', 'новые урлы: /n', photoPaths, '/n');

  // удаление старых фото

  if (oldUrlPhoto) {
    // eslint-disable-next-line no-restricted-syntax
    for await (const pathPhoto of oldUrlPhoto) {
      rm(path.join(config.fotofolder, pathPhoto), { force: true });
    }

    console.log('старые урлы: /n', oldUrlPhoto, '/n', 'новые урлы: /n', photoPaths, '/n');
  }

  //   putProduct.photoUrl = JSON.stringify(photoPaths);

  return { e: false, message: JSON.stringify(photoPaths) };
};

export { writePhotoFile, validPassword };
