import React from 'react';
import Box from '../Box';

type WidgetTitleProps = {
  children: React.ReactNode;

  /**The type of widget it's being used with. */
  type: '.main_widget' | '.mini_widget';
};

const baseStyle = {
  backgroundColor: 'secondary.main',
  display: 'flex',
  justifyContent: 'space-between',
  padding: 1,
  paddingLeft: 2,
  paddingRight: 2,
} as const;

const mainStyle = {
  borderBottom: '1px solid rgba(153, 153, 153, 0.44)',
} as const;

export default function WidgetTitle({
  type,
  children,
  ...otherProps
}: WidgetTitleProps) {
  let style;

  switch (type) {
    case '.main_widget':
      style = {
        ...baseStyle,
        ...mainStyle,
      };
      break;
    case '.mini_widget':
      style = {
        ...baseStyle,
      };
      break;
    default:
      style = baseStyle;
      break;
  }

  return (
    <Box sx={style} {...otherProps}>
      {children}
    </Box>
  );
}
