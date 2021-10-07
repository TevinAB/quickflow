import dayjs from 'dayjs';

export function isValidDate(date: string | number) {
  return !Number.isNaN(new Date(date).getTime());
}

export function formatDate(date: string | number, format: string) {
  return dayjs(date).format(format);
}
