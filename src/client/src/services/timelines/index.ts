import { AUTH_HEADER } from '../../constants';
import { defaultToken } from '../../utils/localStorage';
import { get, post, put } from '../requests';

export async function getTimeline(id: string, token?: string) {
  return await get(`/api/resource/timeline/${id}`, {
    [AUTH_HEADER]: defaultToken(token),
  });
}

export async function addTimelineItem(id: string, data: {}, token?: string) {
  return await post(
    `/api/resource/timeline/${id}`,
    { [AUTH_HEADER]: defaultToken(token), 'content-type': 'application/json' },
    data
  );
}

export async function editTimelineItem(id: string, data: {}, token?: string) {
  return await put(
    `/api/resource/timeline/${id}`,
    { [AUTH_HEADER]: defaultToken(token), 'content-type': 'application/json' },
    data
  );
}
