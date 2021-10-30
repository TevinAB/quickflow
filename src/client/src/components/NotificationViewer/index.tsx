import './notif.css';
import { Notification } from '../../types';
import { timeFromNow } from '../../utils/date';
import { useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { readNotifThunk } from '../../store/slices/user';

type NotificationViewerProps = {
  open: boolean;
  notificationData: Array<Notification>;
};

export default function NotificationViewer({
  open,
  notificationData,
}: NotificationViewerProps) {
  const [openCount, setOpenCount] = useState(0);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (open) setOpenCount((openCount) => openCount + 1);
  }, [open]);

  useEffect(() => {
    if (!open && openCount === 1) {
      dispatch(readNotifThunk({}));
    }
  }, [open, openCount, dispatch]);

  return (
    <ul
      className="notif-viewer"
      style={{ borderColor: theme.widgets.borderColor }}
    >
      {notificationData?.length ? (
        notificationData
          .map((notif, i) => <Notif key={i} {...notif} />)
          .reverse()
      ) : (
        <div className="notif__none">No notifications.</div>
      )}
    </ul>
  );
}

function Notif({ title, type, read, added }: Notification) {
  let classes = 'notif';
  if (!read) {
    classes += ' notif--unread';
  }

  return (
    <li className={classes}>
      <div className="notif__title">
        {!read && <span className="notif__badge"></span>}
        {title}
      </div>
      <div className="notif__date">
        <span title={String(added)}>{timeFromNow(added)}</span>
      </div>
    </li>
  );
}
