import * as bcrypt from 'bcrypt';
// import * as _ from 'lodash';
import * as crypto from 'crypto';

export function validateEmail(email: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
  }
  return false;
}

export function randomCode(howMany: number, chars: string) {
  chars = chars
      || "0123456789";
  const rnd = crypto.randomBytes(howMany)
      , value = new Array(howMany)
      , len = chars.length;

  for (let i = 0; i < howMany; i++) {
      value[i] = chars[rnd[i] % len]
  }

  return value.join('');
};