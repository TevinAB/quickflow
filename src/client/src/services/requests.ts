import axios, { AxiosResponse } from 'axios';

export async function get(path: string, headers: {}) {
  const result = await axios.get(path, { headers });

  return extractData(result);
}

export async function post(path: string, headers: {}, body: {}) {
  const result = await axios.post(path, body, { headers });

  return extractData(result);
}

export async function put(path: string, headers: {}, body: {}) {
  const result = await axios.put(path, body, { headers });

  return extractData(result);
}

export async function _delete(path: string, headers: {}, body?: {}) {
  const result = await axios.delete(path, { headers, data: body });

  return extractData(result);
}

function extractData(result: AxiosResponse<{}>) {
  return { responseHeaders: result.headers, data: result.data };
}
