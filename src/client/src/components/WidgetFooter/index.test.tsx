import WidgetFooter from '.';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme';

describe('Widget Footer test', () => {
  const ThemeWrapper = ({ children }: { children: ReactNode }) => {
    return (
      <ThemeProvider theme={theme}>
        <WidgetFooter>{children}</WidgetFooter>
      </ThemeProvider>
    );
  };

  it('should render', () => {
    const text = 'View all.';
    const { getByText } = render(
      <ThemeWrapper>
        <div>{text}</div>
      </ThemeWrapper>
    );

    getByText(text);
  });
});
