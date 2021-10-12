import { Button as MUIButton, ButtonProps } from '@mui/material';

export default function Button({ children, ...otherProps }: ButtonProps) {
  return <MUIButton {...otherProps}>{children}</MUIButton>;
}
