import { debug } from '../../common/log.js';
const log = debug('app/modules/user/login');

import { compare } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { connection as dbConnection } from '../mysql-connection.js';
import { validateEmail } from '../../common/validate-email.js';
import { validatePasswordFormat } from '../../common/validate-password-format.js';

export const login = async (optionList) => {
  log('`login` got this `optionList`: %o', optionList);

  if (!validateEmail(optionList.email)) {
    throw {
      ok: false,
      errorCode: 104,
      description: 'Invalid `email` format',
    };
  }

  if (!validatePasswordFormat(optionList.password)) {
    throw {
      ok: false,
      errorCode: 104,
      description:
        'Invalid `password` format, a password should contains at least 6 chars (uppercase, lowercase, number and special chars)',
    };
  }

  const userSql = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await dbConnection.execute(userSql, [optionList.email]);
  log('result: %o', { rows });

  const user = rows[0];
  if (user == null) {
    throw {
      type: 'UNAUTHORIZED',
      description: 'Invalid user credentials',
    };
  }

  const validPassword = await compare(optionList.password, user.password);
  if (!validPassword) {
    throw {
      type: 'UNAUTHORIZED',
      description: 'Invalid user credentials',
    };
  }

  const userToken = jsonwebtoken.sign({ userId: user.id, email: user.email }, `${process.env.JWT_KEY}`);

  return {
    ok: true,
    description: 'Successful login process',
    data: {
      token: userToken,
    },
  };
};
