import './index.css';
import { useEffect, useState } from 'react';
import { useGetDealsOverRange } from '../../hooks/deals';
import { WidgetLoadError, WidgetLoading } from '../WidgetUtils';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import type { GroupedDeals, Deal } from '../../types';
import { groupBy, numberFormat } from '../../utils';
import { CURRENCY_DECIMAL } from '../../constants';

type DealSummaryProps = {
  classes?: string;
};

export default function DealSummaryWidget({ classes }: DealSummaryProps) {
  const [formattedDeals, setFormattedDeals] = useState<GroupedDeals>([]);
  const token = useAppSelector((state) => state.user.token);
  const [rangeValue] = useState(new Date());
  const { dealData, error, loading } = useGetDealsOverRange(
    'Year',
    'All',
    rangeValue,
    token
  );

  const renderItems = (
    <div className="deal-summary__body">
      {formattedDeals.map((group) => {
        return <SummaryBox group={group} />;
      })}
    </div>
  );

  useEffect(() => {
    setFormattedDeals(groupBy(dealData, (item) => item.deal_status));
  }, [dealData]);

  return (
    <div className={classes}>
      <div className="widget widget--with-footer">
        <div className="widget__title">
          <Typography fontWeight="bold">Deal Summary [All Deals]</Typography>
        </div>
        <div className="widget__body">
          {error && <WidgetLoadError />}
          {!error && loading && <WidgetLoading />}
          {!error && !loading && renderItems}
        </div>
        <div className="widget__footer">
          <Link to="/deals">View all</Link>
        </div>
      </div>
    </div>
  );
}

type SummaryBoxProps = {
  group: {
    categoryTitle: string;
    categoryItems: Deal[];
  };
};

function SummaryBox({ group }: SummaryBoxProps) {
  const { categoryTitle, categoryItems } = group;

  return (
    <div className="deal-summary__item">
      <div className="deal-summary__item-category">{categoryTitle}</div>
      <div className="deal-summary__item-value">
        {numberFormat(
          categoryItems.reduce((acc, current) => {
            return (acc += current.value);
          }, 0),
          CURRENCY_DECIMAL
        )}
      </div>
      <div className="deal-summary__item-count">
        {categoryItems.length} Deal(s)
      </div>
    </div>
  );
}
