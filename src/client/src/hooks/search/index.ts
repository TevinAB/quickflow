import { useState, useEffect, useRef } from 'react';
import { searchDocuments, searchProfiles } from '../../services/search';
import { SearchType } from '../../types';
import { createCancelToken } from '../../services/requests';

type UseSearchOptions = {
  authToken?: string;
};

export function useSearch(
  type: SearchType,
  query: string,
  options?: UseSearchOptions
) {
  const [data, setData] = useState<Object | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const cancelToken = useRef<ReturnType<typeof createCancelToken>>(
    createCancelToken()
  );

  const authToken = options?.authToken;

  useEffect(() => {
    async function search() {
      setLoading(true);

      if (cancelToken) cancelToken.current?.cancel();

      cancelToken.current.token = createCancelToken().token;

      try {
        //refactor this after fixing api
        if (
          (type === 'Account' || type === 'Contact' || type === 'Deal') &&
          cancelToken.current?.token
        ) {
          const data = await searchDocuments(
            type,
            query,
            cancelToken.current.token,
            authToken
          );

          setLoading(false);
          setData(data?.data);
        } else if (type === 'Profiles' && cancelToken.current) {
          const data = await searchProfiles(
            query,
            cancelToken.current.token,
            authToken
          );

          setLoading(false);
          setData(data?.data);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    search();
  }, [query, type, authToken]);

  return { data, loading, error };
}
