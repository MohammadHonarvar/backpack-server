import { debug } from '../common/log.js';
const log = debug('app/modules/get-user');

export const getUser = () => {
  log('getUser done');
  return 'The user is ready';
};
