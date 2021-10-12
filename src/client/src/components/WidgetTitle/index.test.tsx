import WidgetTitle from '.';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme';

describe('Widget title section', () => {
  it('should render for main widget', () => {
    const text1 = 'title';
    const text2 = 'other';

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <WidgetTitle>
          <div>{text1}</div>
          <div>{text2}</div>
        </WidgetTitle>
      </ThemeProvider>
    );

    getByText(text1);
    getByText(text2);
  });
});
