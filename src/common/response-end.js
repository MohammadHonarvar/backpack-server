import { debug } from './log.js';
const log = debug('app/common/response-end');

import { responseError } from './response-error.js';

/**
 *
 * @param response is node response object
 * @param code is a number to show `http` status code
 * @param content is an object with these keys:
 *              `ok` => true/false
 *              `errorCode` => for example: 101, 102 & etc... (Custom error codes that is optional)
 *              `description` => A description of the operation performed
 *              `data` => An object that contains some information(Optional)
 */

export const responseEnd = (response, code, content = {}) => {
  log('responseEnd: %s => %j', code, content);
  try {
    response.statusCode = code;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(content, undefined, 2));
  } catch (error) {
    log('error: %o', error);
    responseError(response); // error 500
  }
};
