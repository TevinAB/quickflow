import { Typography, TypographyProps } from '@mui/material';

export default function Text({ children, ...otherProps }: TypographyProps) {
  return <Typography {...otherProps}>{children}</Typography>;
}
