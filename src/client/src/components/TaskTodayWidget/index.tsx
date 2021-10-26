import './index.css';
import { setTaskCompleted } from '../../services/activities';
import { useViewActivity } from '../../hooks/activities';
import { subtractDays } from '../../utils/date';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Grow } from '@mui/material';
import Checkbox from '../Checkbox';
import { timeFromNow } from '../../utils/date';
import { WidgetLoadError, WidgetLoading } from '../WidgetUtils';

const taskOverdueOffset = 1; //units = days

type TaskTodayWidgetProps = {
  classes?: string;
};

export default function TaskTodayWidget({ classes }: TaskTodayWidgetProps) {
  const [startDate] = useState(
    subtractDays(new Date().toISOString(), taskOverdueOffset)
  );
  const [endDate] = useState(subtractDays(new Date().toISOString(), 0));

  const token = useAppSelector((state) => state.user.token);
  const userName = useAppSelector((state) => state.user.first_name);
  const {
    activityData: tasksData,
    setActivityData: setTasksData,
    error,
    loading,
  } = useViewActivity('Task', startDate, endDate, token, false);
  const [markedTasks, setMarkedTasks] = useState<Array<string>>([]);

  const removeTaskAfterAnim = (taskId: string) => {
    setTasksData(tasksData.filter((task) => task._id !== taskId));
    setMarkedTasks(markedTasks.filter((mTask) => mTask !== taskId));
  };

  const handleCheckTask = async (taskId: string) => {
    try {
      await setTaskCompleted(
        taskId,
        { completed: true },
        { initiator: userName },
        token
      );

      setMarkedTasks([...markedTasks, taskId]);

      setTimeout(() => {
        removeTaskAfterAnim(taskId);
      }, 300);
    } catch (error) {
      //show toast or something
    }
  };

  const renderItems = (
    <ul className="widget-body--with-list">
      {tasksData.map((task) => (
        <Grow key={task._id} in={!markedTasks.includes(task._id)}>
          <li className="activity__list-item">
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

  const noTasks = <div>Nothing to show for today</div>;

  return (
    <div className={classes}>
      <div className="widget widget--with-footer">
        <div className="widget__title">
          <Typography fontWeight="bold">Today's Tasks</Typography>
        </div>
        <div className="widget__body widget-body--med">
          {error && <WidgetLoadError />}
          {!error && loading && <WidgetLoading />}
          {!error && !loading && tasksData.length > 0 && renderItems}
          {!error && !loading && !tasksData.length && noTasks}
        </div>
        <div className="widget__footer">
          <Link to="/tasks">View all</Link>
        </div>
      </div>
    </div>
  );
}
