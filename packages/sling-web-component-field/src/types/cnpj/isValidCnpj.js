export const isValidCnpj = (arg = '') => {
  let strCnpj = arg;

  let size;
  let numbers;
  let sum;
  let pos;
  let result;

  strCnpj = strCnpj.replace(/\D/g, '');

  if (strCnpj === '') {
    return false;
  }

  if (strCnpj.length !== 14) {
    return false;
  }

  if (strCnpj === '00000000000000' ||
    strCnpj === '11111111111111' ||
    strCnpj === '22222222222222' ||
    strCnpj === '33333333333333' ||
    strCnpj === '44444444444444' ||
    strCnpj === '55555555555555' ||
    strCnpj === '66666666666666' ||
    strCnpj === '77777777777777' ||
    strCnpj === '88888888888888' ||
    strCnpj === '99999999999999') {
    return false;
  }

  size = strCnpj.length - 2;
  numbers = strCnpj.substring(0, size);
  const digits = strCnpj.substring(size);

  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i -= 1) {
    sum += numbers.charAt(size - i) * pos;
    pos -= 1;

    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2
    ? 0
    : 11 - (sum % 11);

  if (String(result) !== digits.charAt(0)) {
    return false;
  }

  size += 1;
  numbers = strCnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i -= 1) {
    sum += numbers.charAt(size - i) * pos;
    pos -= 1;

    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2
    ? 0
    : 11 - (sum % 11);

  if (String(result) !== digits.charAt(1)) {
    return false;
  }

  return true;
};
