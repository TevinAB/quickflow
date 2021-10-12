import LoadingButton from '.';
import { render, fireEvent } from '@testing-library/react';

describe('Loading button test', () => {
  const btnText = 'Click me';
  const loaderText = 'Loading';

  const loader = () => {
    return <div>{loaderText}</div>;
  };

  it('should render', () => {
    const { getByText } = render(<LoadingButton>{btnText}</LoadingButton>);

    getByText(btnText);
  });

  it('should be clickable', () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <LoadingButton onClick={handleClick}>{btnText}</LoadingButton>
    );

    const button = getByText(btnText);

    fireEvent.click(button);

    expect(handleClick).toBeCalledTimes(1);
  });

  it('should show its children if loading is false', () => {
    const { getByText } = render(
      <LoadingButton loading={false}>{btnText}</LoadingButton>
    );

    getByText(btnText);
  });

  it('should not show loading prop if loading is false', () => {
    const { queryByText } = render(
      <LoadingButton loadingProp={loader} loading={false}>
        {btnText}
      </LoadingButton>
    );

    expect(queryByText(loaderText)).toBe(null);
  });

  it('should show loading prop when loading is true', () => {
    const { getByText } = render(
      <LoadingButton loading={true} loadingProp={loader}>
        {btnText}
      </LoadingButton>
    );

    getByText(loaderText);
  });

  it('should not show its children if loading is true', () => {
    const { queryByText } = render(
      <LoadingButton loadingProp={loader} loading={true}>
        {btnText}
      </LoadingButton>
    );

    expect(queryByText(btnText)).toBe(null);
  });

  it('should not be clickable when loading is true', () => {
    const handleClick = jest.fn();

    const { getByRole } = render(
      <LoadingButton onClick={handleClick} loading={true} loadingProp={loader}>
        {btnText}
      </LoadingButton>
    );

    const button = getByRole('button');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
