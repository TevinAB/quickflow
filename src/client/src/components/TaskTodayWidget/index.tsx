import './index.css';
import { setTaskCompleted } from '../../services/activities';
import { useViewTasks } from '../../hooks/activities';
import { subtractDays } from '../../utils/date';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CircularProgress, Grow } from '@mui/material';
import Checkbox from '../Checkbox';
import { timeFromNow } from '../../utils/date';

const taskOverdueOffset = 1; //units = days

export default function TaskTodayWidget() {
  const [startDate] = useState(subtractDays(new Date(), taskOverdueOffset));
  const [endDate] = useState(subtractDays(new Date(), 0));

  const token = useAppSelector((state) => state.user.token);
  const { tasksData, setTasksData, error, loading } = useViewTasks(
    startDate,
    endDate,
    'token'
  );
  const [markedTasks, setMarkedTasks] = useState<Array<string>>([]);

  const removeTaskAfterAnim = (taskId: string) => {
    setTasksData(tasksData.filter((task) => task._id !== taskId));
    setMarkedTasks(markedTasks.filter((mTask) => mTask !== taskId));
  };

  const handleCheckTask = async (taskId: string) => {
    try {
      await setTaskCompleted(taskId, { completed: true }, 'token');

      setMarkedTasks([...markedTasks, taskId]);

      setTimeout(() => {
        removeTaskAfterAnim(taskId);
      }, 300);
    } catch (error) {
      //show toast or something
    }
  };

  const renderError = (
    <div className="error error--text">An error has occured</div>
  );

  const renderLoading = (
    <div className="widget-loading">
      <CircularProgress style={{ width: '32px', height: '32px' }} />
    </div>
  );

  const renderItems = (
    <ul className="widget-body--with-list">
      {tasksData.map((task) => (
        <Grow in={!markedTasks.includes(task._id)}>
          <li key={task._id} className="activity__list-item">
            <div className="task__left-wrapper">
              <Checkbox
                size="small"
                onChange={() => handleCheckTask(task._id)}
              />
              <div>{task.name}</div>
            </div>
            <div className="date-text--1" title={task.end_date}>
              {timeFromNow(task.end_date)}
            </div>
          </li>
        </Grow>
      ))}
    </ul>
  );

  return (
    <div className="widget widget--with-footer">
      <div className="widget__title">
        <Typography fontWeight="bold">Today's Tasks</Typography>
      </div>
      <div className="widget__body widget-body--med">
        {error && renderError}
        {!error && loading && renderLoading}
        {!error && !loading && renderItems}
      </div>
      <div className="widget__footer">
        <Link to="/tasks">View all</Link>
      </div>
    </div>
  );
}
