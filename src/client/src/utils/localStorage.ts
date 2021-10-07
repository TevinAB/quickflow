const LOCAL_STORAGE_ERROR = 'Local storage not enabled.';

export function getFromLocalStorage(storageKey: string) {
  if (window.localStorage) {
    return window.localStorage.getItem(storageKey);
  } else {
    throw new ReferenceError(LOCAL_STORAGE_ERROR);
  }
}

export function writeToLocalStorage(storageKey: string, value: string) {
  if (window.localStorage) {
    window.localStorage.setItem(storageKey, value);
  } else {
    throw new ReferenceError(LOCAL_STORAGE_ERROR);
  }
}

export function defaultToken(token: string | undefined) {
  return token || getFromLocalStorage('token');
}

export function toStringArray(str: string | Array<string>) {
  let result = [];
  if (Array.isArray(str)) {
    result = [...str];
  } else {
    result = Array.of(str);
  }
  return result;
}
