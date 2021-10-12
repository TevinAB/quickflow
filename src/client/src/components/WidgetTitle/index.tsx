import { ReactNode } from 'react';
import { useTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import Box from '../Box';

type WidgetTitleProps = {
  children: ReactNode;
};

export default function WidgetTitle({
  children,
  ...otherProps
}: WidgetTitleProps) {
  const theme = useTheme();

  const baseStyle: SxProps = {
    backgroundColor: 'secondary.main',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 1,
    paddingX: 2,
    borderStyle: 'solid',
    borderWidth: theme.widgets.borderSize,
    borderColor: theme.widgets.borderColor,
    borderTopLeftRadius: theme.widgets.borderRadius,
    borderTopRightRadius: theme.widgets.borderRadius,
  };

  return (
    <Box sx={baseStyle} {...otherProps}>
      {children}
    </Box>
  );
}
