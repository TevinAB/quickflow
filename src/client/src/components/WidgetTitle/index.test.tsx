import { render } from '@testing-library/react';
import WidgetTitle from '.';

describe('Widget title section', () => {
  it('should render for main widget', () => {
    const text1 = 'title';
    const text2 = 'other';

    const { getByText } = render(
      <WidgetTitle type=".main_widget">
        <div>{text1}</div>
        <div>{text2}</div>
      </WidgetTitle>
    );

    getByText(text1);
    getByText(text2);
  });

  it('should render for mini widgets', () => {
    const text1 = 'title';
    const text2 = 'other';

    const { getByText } = render(
      <WidgetTitle type=".mini_widget">
        <div>{text1}</div>
        <div>{text2}</div>
      </WidgetTitle>
    );

    getByText(text1);
    getByText(text2);
  });
});
