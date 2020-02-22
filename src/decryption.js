const CryptoJS = require('crypto-js');

const key = '55a51621a6648525';
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

export const decryption = async (plainText) => {
  plainText = CryptoJS.AES.decrypt(plainText, keyutf, { iv: iv }).toString(CryptoJS.enc.Latin1);
  return plainText;
};