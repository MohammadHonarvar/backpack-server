import { debug } from '../common/log.js';
const log = debug('app/modules/create-user');

export const createUser = () => {
  log('createUser done');
  return 'New user created';
};
