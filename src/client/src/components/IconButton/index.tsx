import { IconButton as MUiIconButton, IconButtonProps } from '@mui/material';

export default function IconButton({
  children,
  ...otherProps
}: IconButtonProps) {
  return <MUiIconButton {...otherProps}>{children}</MUiIconButton>;
}
