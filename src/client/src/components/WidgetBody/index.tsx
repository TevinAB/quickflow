import { ReactNode } from 'react';
import { useTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import Box from '../Box';

type WidgetBodyProps = {
  children: ReactNode;
};

export default function WidgetBody({ children }: WidgetBodyProps) {
  const theme = useTheme();

  const baseStyle: SxProps = {
    backgroundColor: 'secondary.main',
    borderStyle: 'solid',
    borderColor: theme.widgets.borderColor,
    borderWidth: theme.widgets.borderSize,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  };

  return <Box sx={baseStyle}>{children}</Box>;
}
