/**
 * Validates an email. Regexp from: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
 * @param email - Email address.
 * @returns true for valid emails.
 */
export function isValidEmail(email: string) {
  return new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  ).test(email);
}

/**
 * Checks if a value is a valid number.
 * @param value The value to be checked.
 * @returns true for valid numbers.
 */
export function isValidNumber(value: number) {
  return !isNaN(Number(value));
}

/**
 * Checks if a url is valid. Regex from: https://stackoverflow.com/a/9284473/16053675
 * @param url
 * @returns true for valid urls
 */
export function isValidUrl(url: string) {
  return new RegExp(
    /^(?:(?:https?|ftp|mailto):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  ).test(url);
}

export function validatePassword(password: string): {
  is_valid: boolean;
  errorMessage: string;
} {
  //has at least 2 characters from the set [-#$*_]
  if (!new RegExp(/(?:[-#$*_].*){2}/).test(password))
    return {
      is_valid: false,
      errorMessage: 'Requires at least 2 characters from: -#$*_',
    };

  //has at least 1 number
  if (!new RegExp(/[0-9]/).test(password))
    return {
      is_valid: false,
      errorMessage: 'Requires at least 1 digit.',
    };

  //has at least 2 uppercase characters
  if (!new RegExp(/(?:[A-Z]){2}/).test(password))
    return {
      is_valid: false,
      errorMessage: 'Requires at least 2 uppercase characters.',
    };

  //has at least 2 lowercase characters
  if (!new RegExp(/(?:[a-z].*){2}/).test(password))
    return {
      is_valid: false,
      errorMessage: 'Requires at least 2 lowercase characters.',
    };

  //has at least 8 characters overall
  if (password.length < 8)
    return {
      is_valid: false,
      errorMessage: 'Must be at least 8 characters long',
    };

  return { is_valid: true, errorMessage: '' };
}
