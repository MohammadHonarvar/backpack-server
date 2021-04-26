import { debug } from './log.js';
const log = debug('app/common/error-handler');

import { responseEnd } from './response-end.js';
import { responseError } from './response-error.js';

export const errorHandler = (response, error = {}) => {
  log('errorHandler: %o', error);

  switch (error.type) {
    case 'BAD_REQUEST':
      responseEnd(response, 400, {
        ok: false,
        description: error.description,
      });
      break;

    case 'UNAUTHORIZED':
      responseEnd(response, 401, {
        ok: false,
        description: error.description,
      });
      break;

    case 'FORBIDDEN':
      responseEnd(response, 403, {
        ok: false,
        description: error.description,
      });
      break;

    case 'NOT_FOUND':
      responseEnd(response, 404, {
        ok: false,
        description: error.description,
      });
      break;

    default:
      responseError(response, error);
      break;
  }
};
