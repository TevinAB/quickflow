import './index.css';
import { numberFormat } from '../../utils';
import { Link } from 'react-router-dom';
import { CURRENCY_DECIMAL } from '../../constants';
import { Typography } from '@mui/material';
import { useGetAssociatedDeals } from '../../hooks/deals';
import { WidgetLoading, WidgetLoadError } from '../WidgetUtils';
import { useAppSelector } from '../../hooks/redux';

interface DealData {
  name: string;
  value: string | number;
  _id: string;
}

type AsscDealsProp = {
  mainDocId: string;
};

export default function AssociatedDeals({ mainDocId }: AsscDealsProp) {
  const token = useAppSelector((state) => state.user.token);
  const { assoicatedDeals, loading, error } = useGetAssociatedDeals(
    mainDocId,
    token
  );

  const renderError = (
    <div>
      <WidgetLoadError />
    </div>
  );

  const renderLoading = (
    <div>
      <WidgetLoading />
    </div>
  );

  const renderDeals = (
    <div>
      <ul className="widget__body assc-deals__list">
        {assoicatedDeals.map(({ _id, name, value }) => (
          <li>
            <Link to={`/deal/${_id}`}>
              <Deal key={_id} _id={_id} name={name} value={value} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderText = <p>No Associated Deals.</p>;

  return (
    <div className="widget assc-deals">
      <Typography fontWeight="bold" component="h2" className="widget__title">
        Associated Deals ({assoicatedDeals.length})
      </Typography>
      {error && !loading && renderError}
      {!error && loading && renderLoading}
      {!error && !loading && assoicatedDeals.length > 0 && renderDeals}
      {!error && !loading && !assoicatedDeals.length && renderText}
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
