import { Response } from 'express';

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

export function sendErrorResponse(
  response: Response,
  errorCode: number,
  error: Error
) {
  response.status(errorCode).json({ message: error.message });
}
