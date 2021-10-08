import { buildHeaders } from '../headers';
import { get, post, put, _delete } from '../requests';

export async function getRoleOne(id: string, token?: string) {
  return await get(
    `/api/resource/customization/role/${id}`,
    buildHeaders({ auth: token })
  );
}

export async function getRoleMany(token?: string) {
  return await get(
    '/api/resource/customization/roles',
    buildHeaders({ auth: token })
  );
}

export async function createRole(data: {}, token?: string) {
  return await post(
    '/api/resource/customization/role',
    buildHeaders({ auth: token, contentType: 'application/json' }),
    data
  );
}

export async function editRole(id: string, data: {}, token?: string) {
  return await put(
    `/api/resource/customization/role/${id}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    data
  );
}

export async function deleteRole(id: string, token?: string) {
  return await _delete(
    `/api/resource/customization/role/${id}`,
    buildHeaders({ auth: token })
  );
}
