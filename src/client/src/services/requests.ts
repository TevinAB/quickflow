import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

export async function get(
  path: string,
  headers: {},
  config?: AxiosRequestConfig
) {
  try {
    const result = await axios.get(path, { headers, ...config });
    return extractData(result);
  } catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
}

export function createCancelToken() {
  return axios.CancelToken.source();
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

function extractData(result: AxiosResponse<{ [key: string]: any }>) {
  return {
    responseHeaders: {
      ...result.headers,
      status: result.status,
      statusText: result.statusText,
    },
    data: result.data,
  };
}
