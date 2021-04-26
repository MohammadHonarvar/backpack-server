import { debug } from './common/log.js';
const log = debug('app/server');

/**
 * Node packages
 */
import { createServer } from 'http';
import { URL } from 'url';

/**
 * Custom codes
 */
import { responseEnd } from './common/response-end.js';
import { userSignUpHandler } from './request-handlers/user/sign-up.js';
import { userLoginHandler } from './request-handlers/user/login.js';
import { responseError } from './common/response-error.js';

const baseUrl = 'http://localhost:3000';
const requestListener = async (request, response) => {
  /**
   * I used a global `try/catch` to handle any error in nested codes
   */
  try {
    // `URL` imported from `url` package
    const url = new URL(request.url, baseUrl);
    log('Requested URI details: %o', url);
    url.pathname = url.pathname?.replace('/v1', '');

    switch (url.pathname) {
      case '/sign-up':
        await userSignUpHandler(request, response);
        break;

      case '/login':
        userLoginHandler(request, response);
        break;

      default:
        log('Invalid URI');
        responseEnd(response, 404, {
          ok: false,
          description: 'Invalid requested URL',
        });
    }
  } catch (error) {
    log(error);
    responseError(response, error);
  }
};

createServer(requestListener).listen(parseInt(process.env.PORT), process.env.HOST);
log(`Listen ${process.env.HOST}:${process.env.PORT}`);
