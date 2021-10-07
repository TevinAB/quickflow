import { ActivityType } from '../../types';
import { defaultToken } from '../../utils/localStorage';
import { isValidDate, formatDate } from '../../utils/date';
import { DATE_STANDARD_2, AUTH_HEADER } from '../../constants';
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
    { [AUTH_HEADER]: defaultToken(token) }
  );
}

export async function createActivity(
  activityType: ActivityType,
  data: {},
  token?: string
) {
  return await post(
    `/api/resource/activity/${activityType.toLowerCase()}`,
    { [AUTH_HEADER]: defaultToken(token), 'content-type': 'application/json' },
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
    { [AUTH_HEADER]: defaultToken(token), 'content-type': 'application/json' },
    data
  );
}

export async function deleteActivity(
  activityType: ActivityType,
  id: string,
  token?: string
) {
  return await _delete(`/api/resource/activity/${activityType}/${id}`, {
    [AUTH_HEADER]: defaultToken(token),
  });
}
