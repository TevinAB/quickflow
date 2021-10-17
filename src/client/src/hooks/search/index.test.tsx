import { useSearch } from '.';
import { serverWorker } from '../../mock-sw/serverWorker';
import contactResults from '../../mock-sw/search/responses/searchContacts.json';
import profileResults from '../../mock-sw/search/responses/searchProfiles.json';
import { SearchType } from '../../types';
import ReactDOM from 'react-dom';
import { waitFor, act } from '@testing-library/react';

describe('useSearch tests', () => {
  beforeAll(() => {
    serverWorker.listen();
  });

  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should return the correct response [contacts]', async () => {
    act(() => {
      ReactDOM.render(
        <MockEnvironment type="Contact" query="text" />,
        container
      );
    });

    act(() => {
      expect(container.textContent).toBe('loading');
    });

    await waitFor(() => {
      expect(container.textContent).toBe(JSON.stringify(contactResults));
    });
  });

  it('should return the correct response [profiles]', async () => {
    act(() => {
      ReactDOM.render(
        <MockEnvironment type="Profiles" query="some text" />,
        container
      );
    });

    act(() => {
      expect(container.textContent).toBe('loading');
    });

    await waitFor(() => {
      expect(container.textContent).toBe(JSON.stringify(profileResults));
    });
  });

  afterAll(() => {
    serverWorker.close();
  });
});

type MockEnvProps = {
  type: SearchType;
  query: string;
};

function MockEnvironment({ type, query }: MockEnvProps) {
  const { data, loading, error } = useSearch(type, query, {
    authToken: 'token',
  });

  if (error) return <div>error</div>;

  return <div>{loading ? 'loading' : JSON.stringify(data)}</div>;
}
