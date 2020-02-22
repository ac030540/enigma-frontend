const CryptoJS = require('crypto-js');

const key = '55a51621a6648525';
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

export const encryption = async (plainText) => {
  plainText = CryptoJS.AES.encrypt(plainText, keyutf, { iv: iv }).toString();
  return plainText;
};