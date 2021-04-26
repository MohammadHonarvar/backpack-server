import { debug } from './log.js';
const log = debug('app/common/response-end');

import { responseEnd } from './response-end.js';

export const responseError = (response, error = {}) => {
  log('responseError: %o', error);

  const content = {
    ok: false,
    errorCode: 500,
    description: 'Unknown Error!',
  };

  if (error.message) {
    content.data = error.message;
  }

  if (error.errorCode > 0) {
    content.errorCode = error.errorCode;
    content.description = error.description;
    if (error.data) {
      content.data = error.data;
    }
  }

  responseEnd(response, content.errorCode === 500 ? 500 : 400, content);
};
