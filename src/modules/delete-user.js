import { debug } from '../common/log.js';
const log = debug('app/modules/delete-user');

export const deleteUser = () => {
  log('deleteUser done');
  return 'The user deleted';
};
