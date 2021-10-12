import { Box as MUIBox, BoxProps } from '@mui/material';

export default function Box({ children, ...otherProps }: BoxProps) {
  return <MUIBox {...otherProps}>{children}</MUIBox>;
}
