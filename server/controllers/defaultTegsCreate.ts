import Boom from '@hapi/boom';
import crypto from 'crypto';
import db from '../db';
import { Tegs } from '../entity/Tegs';
import { User, UserRole } from '../entity/User';

export const defaultTegsCreate = async () => {
  console.log('создание тегов');
  const tegsArr = [
    'Автомобили',
    'Аксессуары',
    'Мебель',
    'Одежда',
    'Спорт',
    'Техника',
    'Товары для дома',
  ];

  const changeTegs = await db.manager.find(Tegs).catch(() => console.log('Ошибка поиска в базе данных'));
  if (changeTegs) {
    console.log('Теги созданы ранее');
    return { e: true, message: 'Теги созданы ранее' };
  }

  // eslint-disable-next-line no-restricted-syntax
  for await (const teg of tegsArr) {
    const newteg = new Tegs();
    newteg.teg = teg;
    db.manager.save(newteg).catch();
  }
  console.log('Теги созданы');

  return 'Ok';
};
