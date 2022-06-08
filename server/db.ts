import 'reflect-metadata';
import { createConnection, DataSource } from 'typeorm';
import 'colors';
import { get } from 'node-emoji';
import path from 'path';
import { User } from './entity/User';
import { Product } from './entity/Product';

const db = new DataSource(
  {
    type: 'postgres',
    host: '0.0.0.0', // если разбито на контейнеры, то доступ по имени контейнера, если приложение снаружи, а база в контейнере, то через 0.0.0.0, если просто установлена, то локал хост
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    logging: false,
    entities: [User, Product,
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
