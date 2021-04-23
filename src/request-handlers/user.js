import { getUser } from '../modules/get-user.js';
import { editUser } from '../modules/edit-user.js';
import { createUser } from '../modules/create-user.js';
import { deleteUser } from '../modules/delete-user.js';
import { responseEnd } from '../common/response-end.js';

import { debug } from '../common/log.js';
const log = debug('app/request-handlers/user');

const moduleHandlerList = {
  GET: getUser,
  POST: editUser,
  PUT: createUser,
  DELETE: deleteUser,
};
const allowedMethodList = Object.keys(moduleHandlerList);

/**
 * TODO: For `POST` and `PUT` requests i should gather the body of the request
 *       and check required params and get back the appropriate response to the client
 *
 * But this is a demo
 */
export const userHandler = (request, response) => {
  const requestMethodName = request.method;
  log('userHandler => method name: %s', requestMethodName);

  if (allowedMethodList.indexOf(requestMethodName) === -1) {
    return responseEnd(response, 400, 'Invalid request');
  }

  /**
   * If we assigned functions as strings and we had a typo to set function name
   * Or any other reason that causes an error
   */
  if (typeof moduleHandlerList[requestMethodName] !== 'function') {
    throw Error('Invalid module type');
  }

  const actionResult = moduleHandlerList[requestMethodName]();
  return responseEnd(response, 200, actionResult);
};
