const LOCAL_STORAGE_ERROR = 'Local storage not enabled.';

export function getFromLocalStorage(storageKey: string) {
  if (window.localStorage) {
    return window.localStorage.getItem(storageKey);
  } else {
    throw new ReferenceError(LOCAL_STORAGE_ERROR);
  }
}

export default function writeToLocalStorage(storageKey: string, value: string) {
  if (window.localStorage) {
    window.localStorage.setItem(storageKey, value);
  } else {
    throw new ReferenceError(LOCAL_STORAGE_ERROR);
  }
}
