import 'reflect-metadata';
import { createConnection, DataSource } from 'typeorm';
import 'colors';
import { get } from 'node-emoji';

const db = new DataSource(
  {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    logging: false,
    entities: [
      'entity/*.ts'
    ],
    migrations: [
      'migration/*.ts'
    ],
    subscribers: [
      'subscriber/*.ts'
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
