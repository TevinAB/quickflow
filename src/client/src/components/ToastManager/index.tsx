import './index.css';
import { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { hideToast } from '../../store/slices/toasts';

export default function ToastManager() {
  const toastMessage = useAppSelector((state) => state.toastMananger.message);
  const toastType = useAppSelector((state) => state.toastMananger.toastType);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useAppDispatch();

  //only show a toast if there was a change in message
  useEffect(() => {
    setShowToast(true);
  }, [toastMessage]);

  const handleClose = () => {
    dispatch(hideToast());
    setShowToast(false);
  };

  return (
    <>
      {toastMessage && (
        <Snackbar
          className="toast"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          //left unset because horizontal anchor origin doesn't work form some reason
          style={{ width: '280px', left: 'unset' }}
          open={showToast}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert elevation={6} variant="filled" severity={toastType}>
            {toastMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
