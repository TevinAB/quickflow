import axios from 'axios';

export async function _delete(path: string, headers: {}, body?: {}) {
  const result = await axios.delete(path, { headers, data: body });

  return { responseHeaders: result.headers, data: result.data };
}
