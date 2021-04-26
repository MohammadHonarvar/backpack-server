import { fixPersianNumber } from './fix-persian-number.js';

const spaceRegExp = /\s/g;
export const sanitizeString = (str, replaceNumber = false) => {
  if (!str) return '';

  if (replaceNumber) {
    str = fixPersianNumber(str);
  }

  return str.replace(spaceRegExp, '');
};
