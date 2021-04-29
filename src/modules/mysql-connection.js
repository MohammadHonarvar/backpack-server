import { debug } from '../common/log.js';
const log = debug('app/modules/mysql-connection');

import { createConnection } from 'mysql2/promise';

export const mysqlConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.MYSQL_USERNAME ?? 'root',
  password: process.env.MYSQL_PASSWORD ?? '',
  database: process.env.DATABASE_NAME,
};

let connection = null;
try {
  connection = await createConnection(mysqlConfig);
  log('DB connection: %s', connection.threadId);
} catch (error) {
  log(error);
}

export { connection };
