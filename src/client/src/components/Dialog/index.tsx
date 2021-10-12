import { Dialog as MUIDialog, DialogProps } from '@mui/material';

export default function Dialog({ children, ...otherProps }: DialogProps) {
  return <MUIDialog {...otherProps}>{children}</MUIDialog>;
}
