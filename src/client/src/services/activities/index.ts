import { ActivityType } from '../../types';
import { defaultToken } from '../../utils/localStorage';
import { isValidDate, formatDate } from '../../utils/date';
import { DATE_STANDARD_2 } from '../../constants';
import { get } from '../requests';

export async function getActivities(
  activityType: ActivityType,
  token: string,
  dateStart: string,
  dateEnd: string
) {
  const _token = defaultToken(token);

  if (!isValidDate(dateStart) || !isValidDate(dateEnd))
    throw new TypeError('Dates must be valid.');

  const start = formatDate(dateStart, DATE_STANDARD_2);
  const end = formatDate(dateEnd, DATE_STANDARD_2);

  const result = await get(
    `/api/resource/activity/${activityType.toLowerCase()}s?key=end_date&from=${start}&to=${end}}`,
    { 'x-auth-token': _token }
  );

  return result;
}
