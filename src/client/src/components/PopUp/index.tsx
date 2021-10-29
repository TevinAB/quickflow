import './index.css';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

type PopUpProps = {
  open: boolean;
  handleClose?: () => void;

  popUpTitle?: string;
  popUpBody?: string;

  /**Render Prop */
  popUpActions?: () => JSX.Element;
};

export default function PopUp({
  open,
  handleClose,
  popUpTitle,
  popUpBody,
  popUpActions,
}: PopUpProps) {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="form"
      onClose={handleClose}
      aria-labelledby="popup-title"
      aria-describedby="pop-up-content"
    >
      <DialogTitle id="popup-title" className="pop-up-title">
        {popUpTitle}
      </DialogTitle>
      <DialogContent id="pop-up-content">{popUpBody}</DialogContent>
      <DialogActions>{popUpActions && popUpActions()}</DialogActions>
    </Dialog>
  );
}
