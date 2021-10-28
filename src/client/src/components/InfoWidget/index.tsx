import './index.css';
import { Typography } from '@mui/material';
import ProfilePic from '../ProfilePic';
import type { InfoData } from '../../types';

type InfoWidgetProps = {
  title: string;
  data: Array<InfoData>;
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

type MainInfoCardProps = {
  name: string;
  owner: string;
};

export function MainInfoCard({ name, owner }: MainInfoCardProps) {
  return (
    <div className="widget main-info-card">
      <div className="main-info-card__pfp-container">
        <ProfilePic backgroundColor="#ffc241" size="56px">
          {name[0]}
        </ProfilePic>
      </div>
      <div className="main-info-card__details">
        <div>{name}</div>
        <div>
          <span className="info-widget__label">Owner: </span>{' '}
          <span>{owner}</span>
        </div>
      </div>
    </div>
  );
}
