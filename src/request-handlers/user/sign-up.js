import { debug } from '../../common/log.js';
const log = debug('app/request-handlers/user/sign-up');

import { bodyParser } from '../../common/body-parser.js';
import { signUp } from '../../modules/user/sign-up.js';
import { responseEnd } from '../../common/response-end.js';

export const userSignUpHandler = async (request, response) => {
  if (request.method !== 'POST') {
    return responseEnd(response, 400, {
      ok: false,
      description: 'Invalid request',
    });
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

  const signUpResult = await signUp(body);
  return responseEnd(response, 200, signUpResult);
};
