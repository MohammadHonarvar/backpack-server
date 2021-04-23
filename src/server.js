import { debug } from './common/log.js';
const log = debug('app/server');

/**
 * Node packages
 */
import { createServer } from 'http';
import { parse } from 'url';

/**
 * Custom codes
 */
import { userHandler } from './request-handlers/user.js';
import { responseEnd } from './common/response-end.js';

const requestListener = (request, response) => {
  /**
   * I used a global `try/catch` to handle any error in nested codes
   */
  try {
    // `parse` imported from `uri` package
    const url = parse(request.url, false);
    log('Requested URI details: %o', url);

    switch (url.pathname) {
      case '/user':
        userHandler(request, response);
        break;

      default:
        log('Invalid URI');
        responseEnd(response, 404, 'Invalid URI');
    }
  } catch (error) {
    log(error);
    responseEnd(response, 500, 'Something went wrong, try again later');
  }
};

createServer(requestListener).listen(3000);
log(`The server listening to port: ${3000}`);
