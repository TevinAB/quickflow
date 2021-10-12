import Button from '.';
import { render, fireEvent } from '@testing-library/react';

describe('Button test', () => {
  const btnText = 'Click Me';

  it('should render', () => {
    const { getByText } = render(<Button>{btnText}</Button>);

    getByText(btnText);
  });

  it('should be clickable', () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <Button onClick={handleClick}>{btnText}</Button>
    );

    const button = getByText(btnText);

    fireEvent.click(button);

    expect(handleClick).toBeCalledTimes(1);
  });
});
