import { debug } from './log.js';
const log = debug('app/common/response-end');

export const responseEnd = (response, code, message = '') => {
  log('responseEnd: %s => %j', code, message);
  response.statusCode = code;
  response.end(message);
};
