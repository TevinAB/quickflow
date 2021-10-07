import { post } from '../requests';

export async function login(data: {}) {
  return await auth('/api/auth/login', data);
}

export async function signUp(data: {}) {
  return await auth('/api/auth/sign_up', data);
}

async function auth(path: string, data: {}) {
  return await post(path, { 'content-type': 'application/json' }, data);
}
