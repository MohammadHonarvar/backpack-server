import { debug } from '../../common/log.js';
const log = debug('app/modules/user/sign-up');

export const signUp = () => {
  log('signUp done');
  return 'New user created';
};
