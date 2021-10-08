import { buildHeaders } from '../headers';
import { get, post, put } from '../requests';

export async function getTimeline(id: string, token?: string) {
  return await get(
    `/api/resource/timeline/${id}`,
    buildHeaders({ auth: token })
  );
}

export async function addTimelineItem(id: string, data: {}, token?: string) {
  return await post(
    `/api/resource/timeline/${id}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    data
  );
}

export async function editTimelineItem(id: string, data: {}, token?: string) {
  return await put(
    `/api/resource/timeline/${id}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    data
  );
}
