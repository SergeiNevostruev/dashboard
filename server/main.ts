// import * as boom from '@hapi/boom';
// import * as hapi from '@hapi/hapi';
// import * as joi from 'joi';
// import * as inert from '@hapi/inert';
// import * as swagger from 'hapi-swagger';
import 'colors';
import { get } from 'node-emoji';
import db from './lib/db';
import init from './lib/server';

// база данных
db.initialize()
  .then(() => {
    console.log(get('book'), get('traffic_light'), 'Соединение с базой данных установлено'.yellow);
  })
  .catch((err) => {
    console.error(get('comet'), ' Ошибка базы данных'.red, err);
  });

// запуск серверного приложения
init();
