import NotificationViewer from '.';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme';
import { useState } from 'react';

const notificationData = [
  {
    title: 'You were assigned to johnny flame.',
    read: false,
    type: 'Contact',
    added: '2021-10-01T01:40:54.311Z',
  },
  {
    title: 'You were assigned to lui yang.',
    read: false,
    type: 'Contact',
    added: '2021-10-01T01:43:04.388Z',
  },
  {
    title: 'You were assigned to Sun llc.',
    read: false,
    type: 'Account',
    added: '2021-10-01T01:44:33.342Z',
  },
];

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

const btnText = '123';
function MockEnvironment(props: {}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <NotificationViewer data={notificationData} open={open} />
      <button onClick={() => setOpen(!open)}>{btnText}</button>
    </div>
  );
}

describe('<NotificationViewer/>', () => {
  it('should render all given notifications', () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <NotificationViewer data={notificationData} open />
      </ThemeProvider>
    );

    notificationData.forEach((notif) => queryByText(notif.title));
  });

  it('should read notifications after being opened and closed once', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MockEnvironment />
      </ThemeProvider>
    );

    const button = getByText(btnText);

    fireEvent.click(button); //'view/open' notif
    expect(mockDispatch).toBeCalledTimes(0);
    fireEvent.click(button); //'hide/close' notif

    expect(mockDispatch).toBeCalledTimes(1);
  });

  it('should not read notifications more than once', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MockEnvironment />
      </ThemeProvider>
    );

    const button = getByText(btnText);

    fireEvent.click(button); //'view/open' notif
    fireEvent.click(button); //'hide/close' notif

    expect(mockDispatch).toBeCalledTimes(1);

    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockDispatch).toBeCalledTimes(1);
  });

  it('should not read notifications before being opened', () => {
    render(
      <ThemeProvider theme={theme}>
        <MockEnvironment />
      </ThemeProvider>
    );

    expect(mockDispatch).toBeCalledTimes(0);
  });
});
