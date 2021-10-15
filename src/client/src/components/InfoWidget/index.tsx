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
    <div className="info-widget">
      <Typography
        className="info-widget__title"
        fontWeight="bold"
        variant="h6"
        component="h2"
      >
        {title}
      </Typography>
      {data.map((item) => (
        <div>
          <div className="info-widget__label">{item.label}</div>
          <div>{item.value}</div>
        </div>
      ))}
    </div>
  );
}
