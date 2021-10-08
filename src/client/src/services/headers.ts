import { defaultToken } from '../utils/localStorage';
import { AUTH_HEADER } from '../constants';

interface Headers {
  auth?: string;
  contentType?: string;
}

export function buildHeaders(headers: Headers) {
  const result: { [key: string]: any } = {};

  if (headers.auth) result[AUTH_HEADER] = defaultToken(headers.auth);
  if (headers.contentType) result['content-type'] = headers.contentType;

  return result;
}
