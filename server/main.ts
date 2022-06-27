import 'colors';
import { get } from 'node-emoji';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import config from './config/config.json';
import db from './db';
import init from './lib/server';
import { adminCreate } from './controllers/adminCreate';
import { defaultTegsCreate } from './controllers/defaultTegsCreate';

dotenv.config();

// создание папки для фото
fs.access(path.join(config.fotofolder), (err) => {
  if (err && err.code === 'ENOENT') {
    fs.mkdir(path.join(config.fotofolder), (e) => {
      console.log(e);
    });
  }
});

db.initialize()
  .then(async () => {
    console.log(get('book'), get('traffic_light'), 'Соединение с базой данных установлено'.yellow);
    // запуск миграций
    await db.runMigrations();
    // создание админа
    adminCreate();
    // создание тегов
    defaultTegsCreate();
  })
  .catch((err) => {
    console.error(get('comet'), ' Ошибка базы данных ====> '.red, err);
  });

// запуск серверного приложения
init();
