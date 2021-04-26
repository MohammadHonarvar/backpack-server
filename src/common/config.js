import dotenv from 'dotenv';
import fs from 'fs';

import { debug } from './log.js';
const log = debug('app/config');

const loadDotEnv = (path) => {
  if (!fs.existsSync(path)) {
    log(`Skip parsing ${path}, File not found.`);
    return false;
  }
  // else
  log(`Using ${path} to supply config environment variables`);
  const dotenvResult = dotenv.config({ path });
  log('%s parsed: %j', path, dotenvResult.parsed);
  if (dotenvResult.error) {
    log('%s error', path, dotenvResult.error);
    return false;
  }
  // else
  return true;
};

// tslint:disable-next-line: no-unused-expression
loadDotEnv('.env') || loadDotEnv('.env.example');
