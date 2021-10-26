import { useState, useEffect, useRef } from 'react';
import { searchDocuments, searchProfiles } from '../../services/search';
import { SearchType, SearchResultItem } from '../../types';
import { createCancelToken } from '../../services/requests';

type UseSearchOptions = {
  authToken?: string;
};

export function useSearch(
  type: SearchType,
  query: string,
  options?: UseSearchOptions
) {
  const [data, setData] = useState<Array<SearchResultItem>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const cancelToken = useRef<ReturnType<typeof createCancelToken>>(
    createCancelToken()
  );

  const authToken = options?.authToken;

  useEffect(() => {
    async function search() {
      if (query.length < 3) return;
      setLoading(true);

      if (cancelToken.current) cancelToken.current.cancel();

      cancelToken.current = createCancelToken();

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
          setData(data?.data.result);
        } else if (type === 'Profile' && cancelToken.current) {
          const data = await searchProfiles(
            query,
            cancelToken.current.token,
            authToken
          );

          setLoading(false);
          setData(data?.data.result);
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
