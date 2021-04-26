import { responseEnd } from '../../common/response-end.js';

import { debug } from '../../common/log.js';
const log = debug('app/request-handlers/user/login');

export const userLoginHandler = (request, response) => {
  log('userLoginHandler is running...');
  return responseEnd(response, 200, { test: 'adads' });
};
