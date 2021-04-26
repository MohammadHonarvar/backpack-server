import { debug } from '../../common/log.js';
const log = debug('app/modules/user/login');

export const login = () => {
  log('login done');
  return 'New user created';
};
