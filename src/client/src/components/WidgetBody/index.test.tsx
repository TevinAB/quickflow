import WidgetBody from '.';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme';
import { render } from '@testing-library/react';

describe('Widget Body test', () => {
  it('should render', () => {
    const text = 'some text here..';

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <WidgetBody>
          <div>{text}</div>
        </WidgetBody>
      </ThemeProvider>
    );

    getByText(text);
  });
});
