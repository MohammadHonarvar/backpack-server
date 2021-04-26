import { debug } from '../../common/log.js';
const log = debug('app/request-handlers/user/login');

import { bodyParser } from '../../common/body-parser.js';
import { login } from '../../modules/user/login.js';
import { responseEnd } from '../../common/response-end.js';

export const userLoginHandler = async (request, response) => {
  if (request.method !== 'POST') {
    throw {
      type: 'BAD_REQUEST',
      description: 'Invalid request',
    };
  }

  const body = await bodyParser(request);
  log('Body of request is: %o', body);
  if (!(body.email != null && body.password != null)) {
    throw {
      ok: false,
      errorCode: 103,
      description: '`email` and `password` is required to sign up',
    };
  }

  const loginResult = await login(body);
  return responseEnd(response, 200, loginResult);
};
