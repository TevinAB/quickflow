import './index.css';
import { Typography } from '@mui/material';

type InfoWidgetProps = {
  title: string;
  data: Array<{
    label: string;
    value: string | number;
  }>;
};

export default function InfoWidget({ title, data }: InfoWidgetProps) {
  return (
    <div className="widget">
      <Typography className="widget__title" fontWeight="bold" component="h2">
        {title}
      </Typography>
      <ul className="widget__body info__body">
        {data.map((item) => (
          <li>
            <div className="info-widget__label">{item.label}</div>
            <div>{item.value}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
