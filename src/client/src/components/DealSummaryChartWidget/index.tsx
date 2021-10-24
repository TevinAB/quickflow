import './index.css';
import { useState, useEffect } from 'react';
import { useGetDealsOverRange } from '../../hooks/deals';
import { WidgetLoadError, WidgetLoading } from '../WidgetUtils';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import type { Deal, DealRangeTypes, DealCategory } from '../../types';
import { groupBy } from '../../utils';
import { formatDate } from '../../utils/date';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type ChartDataType = {
  name: string;
  value: number;
};

export default function DealSummaryChartWidget() {
  const [rangeType] = useState<DealRangeTypes>('Year');
  const [dealType] = useState<DealCategory>('All');
  const [rangeValue] = useState(new Date());
  const [formattedDeals, setFormattedDeals] = useState<Array<ChartDataType>>(
    []
  );

  const token = useAppSelector((state) => state.user.token);
  const { dealData, error, loading } = useGetDealsOverRange(
    rangeType,
    dealType,
    rangeValue,
    token
  );

  //too ad-hoc, fix later
  useEffect(() => {
    const result = groupBy<Deal>(dealData, (deal) =>
      formatDate(deal.closed_date, 'MMM')
    );

    const tempData = result.map((group) => {
      return {
        name: group.categoryTitle,
        value: group.categoryItems.reduce((acc, deal) => {
          return (acc += deal.value);
        }, 0),
      };
    });

    setFormattedDeals(tempData);
  }, [dealData]);

  const renderItems = (
    <ResponsiveContainer width="100%" height="100%" minHeight="300px">
      <AreaChart width={500} height={400} data={formattedDeals}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderNoDeals = (
    <div className="deal-chart__empty-text">No deals found, add some!</div>
  );

  return (
    <div>
      <div className="widget widget--with-footer">
        <div className="widget__title">
          <Typography fontWeight="bold">Annual Report</Typography>
        </div>
        <div className="widget__body deal-chart__body">
          {error && <WidgetLoadError />}
          {!error && loading && <WidgetLoading />}
          {!error && !loading && formattedDeals.length > 0 && renderItems}
          {!error && !loading && !formattedDeals.length && renderNoDeals}
        </div>
      </div>
    </div>
  );
}
