import './index.css';
import { numberFormat } from '../../utils';
import { Link } from 'react-router-dom';
import React from 'react';
import { CURRENCY_DECIMAL } from '../../constants';
import { Typography } from '@mui/material';

interface DealData {
  name: string;
  value: string | number;
  _id: string;
}

type AsscDealsProp = {
  deals: Array<DealData>;
};

export default function AssociatedDeals({ deals }: AsscDealsProp) {
  return (
    <div className="assc-deals">
      <Typography fontWeight="bold" component="h2" variant="h6">
        Associated Deals ({deals.length})
      </Typography>
      <ul className="assc-deals__list">
        {deals.map(({ _id, name, value }) => (
          <li>
            <Link to={`/deal/${_id}`}>
              <Deal key={_id} _id={_id} name={name} value={value} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Deal({ name, value, _id }: DealData) {
  return (
    <div className="assc-deals__deal">
      <div className="assc__deal-name">{name}</div>
      <div className="assc__deal-value">
        {numberFormat(value, CURRENCY_DECIMAL)}
      </div>
    </div>
  );
}
