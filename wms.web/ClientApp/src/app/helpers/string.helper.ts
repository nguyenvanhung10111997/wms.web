import * as CryptoJS from 'crypto-js';

export function generateMd5Hash(input: string) {
  const hash = CryptoJS.MD5(input);
  const md5 = hash.toString(CryptoJS.enc.Hex);

  return md5;
}
