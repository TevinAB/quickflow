import { buildHeaders } from '../headers';
import { toStringArray } from '../../utils/localStorage';
import { get, post, put, _delete, buildRequestData } from '../requests';

export async function getProfileOne(id: string, token: string) {
  return await get(
    `/api/resource/customization/profile/${id}`,
    buildHeaders({ auth: token })
  );
}

export async function getProfileMany(token: string) {
  return await get(
    '/api/resource/customization/profiles',
    buildHeaders({ auth: token })
  );
}

export async function createProfile(data: {}, token: string) {
  return await post(
    '/api/resource/customization/profile',
    buildHeaders({ auth: token, contentType: 'application/json' }),
    buildRequestData({ data })
  );
}

export async function editProfile(id: string, data: {}, token: string) {
  return await put(
    `/api/resource/customization/profile/${id}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    buildRequestData({ data })
  );
}

export async function deleteProfile(id: string, token: string) {
  return await _delete(
    '/api/resource/customization/profile',
    buildHeaders({ auth: token, contentType: 'application/json' }),
    buildRequestData({ data: { _ids: toStringArray(id) } })
  );
}

export async function readNotifications(profileId: string, token: string) {
  return await put(
    `/api/resource/notifications/${profileId}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    {}
  );
}
