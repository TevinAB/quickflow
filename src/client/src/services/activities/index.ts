import { ActivityType } from '../../types';
import { buildHeaders } from '../headers';
import { isValidDate, formatDate } from '../../utils/date';
import { DATE_STANDARD_2 } from '../../constants';
import { get, post, put, _delete } from '../requests';

export async function getActivities(
  activityType: ActivityType,
  dateStart: string,
  dateEnd: string,
  token?: string
) {
  if (!isValidDate(dateStart) || !isValidDate(dateEnd))
    throw new TypeError('Dates must be valid.');

  const start = formatDate(dateStart, DATE_STANDARD_2);
  const end = formatDate(dateEnd, DATE_STANDARD_2);

  return await get(
    `/api/resource/activity/${activityType.toLowerCase()}s?key=end_date&from=${start}&to=${end}}`,
    buildHeaders({ auth: token })
  );
}

export async function createActivity(
  activityType: ActivityType,
  data: {},
  token?: string
) {
  return await post(
    `/api/resource/activity/${activityType.toLowerCase()}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    data
  );
}

export async function editActivity(
  activityType: ActivityType,
  id: string,
  data: {},
  token?: string
) {
  return await put(
    `/api/resource/activity/${activityType.toLowerCase()}/${id}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    data
  );
}

export async function deleteActivity(
  activityType: ActivityType,
  id: string,
  token?: string
) {
  return await _delete(
    `/api/resource/activity/${activityType}/${id}`,
    buildHeaders({ auth: token })
  );
}

export async function setTaskCompleted(
  id: string,
  data: { completed: boolean },
  token?: string
) {
  return await put(
    `/api/resource/activity/task/completed/${id}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    data
  );
}
