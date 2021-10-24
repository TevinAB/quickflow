import type { Deal, DealRangeTypes, DealCategory } from './../../types/index';
import { useState, useEffect } from 'react';
import { getDealsOverRange } from '../../services/document';

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
        const result = await getDealsOverRange(
          rangeType,
          dealType,
          value,
          token
        );

        setDealData(result?.data.result as Array<Deal>);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }

    getDeals();
  }, [rangeType, dealType, value, token]);

  return { dealData, error, loading };
}
