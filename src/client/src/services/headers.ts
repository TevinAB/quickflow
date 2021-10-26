import { defaultToken } from '../utils/localStorage';
import { AUTH_HEADER } from '../constants';

interface Headers {
  auth?: string;
  contentType?: string;
}

export function buildHeaders(headers: Headers) {
  const result: { [key: string]: any } = {};

  if (headers.hasOwnProperty('auth'))
    result[AUTH_HEADER] = defaultToken(headers.auth);

  if (headers.hasOwnProperty('contentType'))
    result['content-type'] = headers.contentType;

  return result;
}
