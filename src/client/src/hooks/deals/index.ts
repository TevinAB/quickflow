import type {
  Deal,
  DealRangeTypes,
  DealCategory,
  RequestError,
} from './../../types/index';
import { useState, useEffect } from 'react';
import { getDealsOverRange, getAssociatedDeals } from '../../services/document';
import { getRequestErrorData } from '../../utils';

export function useGetDealsOverRange(
  rangeType: DealRangeTypes,
  dealType: DealCategory,
  value: Date,
  token: string
) {
  const [dealData, setDealData] = useState<Array<Deal>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getDeals() {
      setLoading(true);
      try {
        const response = await getDealsOverRange(
          rangeType,
          dealType,
          value,
          token
        );

        if (!response) {
          setLoading(false);
        } else {
          setDealData(response.data.result as Array<Deal>);
          setLoading(false);
        }
      } catch (error) {
        const { statusCode } = getRequestErrorData(error as RequestError);

        //don't treat 404's as an actual error
        if (statusCode !== 404) {
          setError(true);
        }
        setLoading(false);
      }
    }

    getDeals();
  }, [rangeType, dealType, value, token]);

  return { dealData, error, loading };
}

export function useGetAssociatedDeals(mainDocId: string, token: string) {
  const [loading, setLoading] = useState(false);
  const [assoicatedDeals, setAssociatedDeals] = useState<Array<Deal>>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getAssocDeals() {
      setLoading(true);
      try {
        const response = await getAssociatedDeals(mainDocId, token);

        const deals = response?.data.result as Array<Deal>;

        setAssociatedDeals(deals);
        setLoading(false);
      } catch (error) {
        const requestErr = error as RequestError;

        if (requestErr.response?.status !== 404) {
          setError(true);
        }

        setLoading(false);
      }
    }

    getAssocDeals();
  }, [token, mainDocId]);

  return { assoicatedDeals, loading, error };
}
