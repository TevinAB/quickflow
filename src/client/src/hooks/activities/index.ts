import { useState, useEffect } from 'react';
import { getActivities } from '../../services/activities';
import { Event, Task, RequestError, ActivityType } from '../../types';

export function useViewActivity(
  activityType: ActivityType,
  dateStart: string,
  dateEnd: string,
  token: string,
  completed?: boolean
) {
  const [activityData, setActivityData] = useState<Array<Task | Event>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getActivity() {
      setLoading(true);

      try {
        const result = await getActivities(
          activityType,
          dateStart,
          dateEnd,
          token,
          completed
        );

        setActivityData(result?.data.result as Array<Task | Event>);
        setLoading(false);
      } catch (error) {
        const responseErr = error as RequestError;

        if (responseErr.response?.status !== 404) {
          setError(true);
        }
        setLoading(false);
      }
    }

    getActivity();
  }, [activityType, dateStart, dateEnd, token, completed]);

  return { activityData, setActivityData, error, loading };
}
