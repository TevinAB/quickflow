import './index.css';
import { useViewEvents } from '../../hooks/activities';
import { subtractDays } from '../../utils/date';
import { useAppSelector } from '../../hooks/redux';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { timeFromNow } from '../../utils/date';
import { WidgetLoadError, WidgetLoading } from '../WidgetUtils';

export default function EventTodayWidget() {
  const [startDate] = useState(subtractDays(new Date(), 0));
  const [endDate] = useState(subtractDays(new Date(), 0));

  const token = useAppSelector((state) => state.user.token);
  const { eventsData, error, loading } = useViewEvents(
    startDate,
    endDate,
    token
  );

  const renderItems = (
    <ul className="widget-body--with-list">
      {eventsData.map((task) => (
        <li key={task._id} className="activity__list-item event-list-item">
          <div>{task.name}</div>
          <div className="date-text--1" title={task.end_date}>
            {timeFromNow(task.end_date)}
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <div className="widget widget--with-footer">
        <div className="widget__title">
          <Typography fontWeight="bold">Today's Events</Typography>
        </div>
        <div className="widget__body widget-body--med">
          {error && <WidgetLoadError />}
          {!error && loading && <WidgetLoading />}
          {!error && !loading && renderItems}
        </div>
        <div className="widget__footer">
          <Link to="/events">View all</Link>
        </div>
      </div>
    </div>
  );
}
