const persianNumberArr = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
const arabicNumberArr = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

export const fixPersianNumber = (newString) => {
  let i = 0;
  for (; i < 10; i++) {
    newString = newString
      .replace(persianNumberArr[i], i.toString())
      .replace(arabicNumberArr[i], i.toString());
  }

  return newString;
};
