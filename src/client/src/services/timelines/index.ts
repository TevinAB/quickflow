import type {
  HttpRequestMetaData,
  TimelineItemSubmitData,
} from './../../types';
import { buildHeaders } from '../headers';
import { get, post, put, buildRequestData } from '../requests';

export async function getTimeline(timelineId: string, token: string) {
  return await get(
    `/api/resource/timeline/${timelineId}`,
    buildHeaders({ auth: token })
  );
}

export async function addTimelineItem(
  timelineId: string,
  itemData: TimelineItemSubmitData,
  requestMetaData: HttpRequestMetaData,
  token: string
) {
  return await post(
    `/api/resource/timeline/${timelineId}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    buildRequestData({ data: itemData, metaData: requestMetaData })
  );
}

export async function editTimelineItem(
  timelineId: string,
  itemData: {},
  requestMetaData: HttpRequestMetaData,
  token: string
) {
  return await put(
    `/api/resource/timeline/${timelineId}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    buildRequestData({ data: itemData, metaData: requestMetaData })
  );
}
