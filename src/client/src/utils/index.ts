import numeral from 'numeral';

export function debounce(callback: () => void, delay: number) {
  let timer: NodeJS.Timeout;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}

export function numberFormat(value: number | string, format: string) {
  return numeral(value).format(format);
}
