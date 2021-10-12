import { ReactNode } from 'react';
import Box from '../Box';

type WidgetFooterProps = {
  children: ReactNode;
};

const baseStyle = {
  backgroundColor: 'secondary.main',
  display: 'flex',
  justifyContent: 'center',
  padding: 1,
} as const;

export default function WidgetFooter({ children }: WidgetFooterProps) {
  return <Box sx={baseStyle}>{children}</Box>;
}
