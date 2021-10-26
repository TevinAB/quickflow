import dayjs, { OpUnitType } from 'dayjs';

export async function promiseRetry(
  fn: () => Promise<any>,
  limit: number,
  delay: number
) {
  try {
    const result = await fn();

    return result;
  } catch (error) {
    if (limit < 1) return Promise.reject(error);
    await new Promise((resolve) => setTimeout(resolve, delay));

    await promiseRetry(fn, limit - 1, delay);
  }
}

export function isValidDate(date: string | number) {
  return !Number.isNaN(new Date(date).getTime());
}

export function dateStartOf(date: string | Date, unit: OpUnitType) {
  return dayjs(date).startOf(unit);
}

export function dateEndOf(date: string | Date, unit: OpUnitType) {
  return dayjs(date).endOf(unit);
}
