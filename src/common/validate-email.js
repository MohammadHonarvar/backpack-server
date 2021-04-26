import { sanitizeString } from './sanitize-string.js';

const emailValidRegExp = /^(.*<)?[\w\.\-_]+@[\w\.\-_]{2,}>?$/;
export const validateEmail = (email, skipSanitize = false) => {
  if (typeof email !== 'string') return false;

  if (!skipSanitize) {
    email = sanitizeString(email, true);
  }

  return emailValidRegExp.test(email);
};
