import { ReactNode } from 'react';
import { useTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import Box from '../Box';

type WidgetFooterProps = {
  children: ReactNode;
};

export default function WidgetFooter({ children }: WidgetFooterProps) {
  const theme = useTheme();

  const baseStyle: SxProps = {
    backgroundColor: 'secondary.main',
    display: 'flex',
    borderStyle: 'solid',
    borderWidth: theme.widgets.borderSize,
    borderColor: theme.widgets.borderColor,
    borderBottomLeftRadius: theme.widgets.borderRadius,
    borderBottomRightRadius: theme.widgets.borderRadius,
    justifyContent: 'center',
    padding: 1,
  };

  return <Box sx={baseStyle}>{children}</Box>;
}
