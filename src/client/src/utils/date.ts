import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function isValidDate(date: string | number) {
  return !Number.isNaN(new Date(date).getTime());
}

export function formatDate(date: string | number, format: string) {
  return dayjs(date).format(format);
}

export function timeFromNow(date: string | Date) {
  return dayjs(date).fromNow();
}

export function subtractDays(date: Date | string, days: number) {
  return dayjs(date).subtract(days, 'day').toISOString();
}
