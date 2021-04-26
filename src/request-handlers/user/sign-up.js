import { responseEnd } from '../../common/response-end.js';

import { debug } from '../../common/log.js';
const log = debug('app/request-handlers/user/sign-up');

export const userSignUpHandler = (request, response) => {
  return responseEnd(response, 200, { test2: 'sdfsdf' });
};
