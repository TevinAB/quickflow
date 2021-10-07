import { RestRequest } from 'msw';

interface ValidationOptions {
  headers?: Array<string>;
  searchParams?: Array<string>;
  pathParams?: Array<string>;
}

/**
 * Validate the request being made by msw.
 */
export function validateRequest(
  request: RestRequest,
  options: ValidationOptions
) {
  let headers = true;
  let searchParams = true;
  let pathParams = true;

  if (options.headers) {
    headers = options.headers.every((header) => request.headers.has(header));
  }

  if (options.searchParams) {
    searchParams = options.searchParams.every((param) =>
      request.url.searchParams.has(param)
    );
  }

  if (options.pathParams) {
    pathParams = options.pathParams.every((param) => request.params[param]);
  }

  return headers && searchParams && pathParams;
}
