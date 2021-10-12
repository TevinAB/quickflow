import WidgetFooter from '.';
import { render } from '@testing-library/react';

describe('Widget Footer test', () => {
  it('should render', () => {
    const text = 'View all.';
    const { getByText } = render(
      <WidgetFooter>
        <div>{text}</div>
      </WidgetFooter>
    );

    getByText(text);
  });
});
