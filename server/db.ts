import 'reflect-metadata';
import { createConnection, DataSource } from 'typeorm';
import 'colors';
import { get } from 'node-emoji';
import path from 'path';
import dotenv from 'dotenv';
import { User } from './entity/User';
import { Product } from './entity/Product';
import { Tegs } from './entity/Tegs';

dotenv.config();

const db = new DataSource(
  {
    type: 'postgres',
    host: '0.0.0.0', // если разбито на контейнеры, то доступ по имени контейнера, если приложение снаружи, а база в контейнере, то через 0.0.0.0, если просто установлена, то локал хост
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Product, Tegs,
      path.join(__dirname, 'entity/*.ts')
    ],
    migrations: [
      path.join(__dirname, 'migration/*.ts')
    ],
    subscribers: [
      path.join(__dirname, 'subscriber/*.ts')
    ],
  }
);

export default db;

// typeorm connection
// =====================================================================================

// export default createConnection()
//   .then(async (connection) => {
//     console.log(get('book'), get('traffic_light'), 'Соединение с базой данных установлено');
//   }).catch((error) => console.log(error));
// =====================================================================================

// errors
// process.on('unhandledRejection', (err) => {
//   console.error(err);
//   process.exit(1);
// });
// =====================================================================================
