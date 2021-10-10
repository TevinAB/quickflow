import { post } from '../requests';
import { LoginData, SignUpData } from '../../types';
import { buildHeaders } from '../headers';

export async function login(data: LoginData) {
  return await auth('/api/auth/login', data);
}

export async function signUp(data: SignUpData) {
  return await auth('/api/auth/sign_up', data);
}

async function auth(path: string, data: {}) {
  return await post(
    path,
    buildHeaders({ contentType: 'application/json' }),
    data
  );
}
