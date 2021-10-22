import { useState, useEffect } from 'react';
import { getActivities } from '../../services/activities';
import { Event, Task } from '../../types';

export function useViewEvents(
  dateStart: string,
  dateEnd: string,
  token: string
) {
  const [eventsData, setEventsData] = useState<Array<Event>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getEvents() {
      setLoading(true);

      try {
        const result = await getActivities('Event', dateStart, dateEnd, token);

        setEventsData(result?.data.result as Array<Event>);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }

    getEvents();
  }, [dateStart, dateEnd, token]);

  return { eventsData, error, loading };
}

export function useViewTasks(
  dateStart: string,
  dateEnd: string,
  token: string
) {
  const [tasksData, setTasksData] = useState<Array<Task>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTasks() {
      setLoading(true);

      try {
        const result = await getActivities('Task', dateStart, dateEnd, token);

        setTasksData(result?.data.result as Array<Task>);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }

    getTasks();
  }, [dateStart, dateEnd, token]);

  return { tasksData, setTasksData, error, loading };
}
