import { TOKEN_NAME } from './../constants/index';

let storageEnabled: boolean | null = null;
const LOCAL_STORAGE_ERROR = 'Local storage not enabled.';

function localStorageEnabled() {
  if (storageEnabled !== null) return storageEnabled;

  try {
    if (!window.localStorage) throw new ReferenceError(LOCAL_STORAGE_ERROR);

    localStorage.setItem('test_storage', 'text');
    localStorage.removeItem('test_storage');
    storageEnabled = true;
  } catch (error) {
    storageEnabled = false;
  }

  return storageEnabled;
}

export function getFromLocalStorage(storageKey: string) {
  if (localStorageEnabled()) {
    return window.localStorage.getItem(storageKey);
  } else {
    throw new ReferenceError(LOCAL_STORAGE_ERROR);
  }
}

export function writeToLocalStorage(storageKey: string, value: string) {
  if (localStorageEnabled()) {
    window.localStorage.setItem(storageKey, value);
  } else {
    throw new ReferenceError(LOCAL_STORAGE_ERROR);
  }
}

export function removeFromLocalStorage(storageKey: string) {
  if (localStorageEnabled()) {
    window.localStorage.removeItem(storageKey);
  } else {
    throw new ReferenceError(LOCAL_STORAGE_ERROR);
  }
}

export function defaultToken(token: string | undefined) {
  if (token) return token;

  let token_;
  try {
    token_ = getFromLocalStorage(TOKEN_NAME);
  } catch (error) {
    token_ = 'none';
  }
  return token_;
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
