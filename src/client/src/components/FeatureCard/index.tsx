import './index.css';
import React, { ReactNode } from 'react';
import Text from '../Text';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';

const featureType = {
  contacts: {
    icon: ContactPageOutlinedIcon,
    bgColor: 'bg-1',
    title: 'manage contacts',
  },
  pipelines: {
    icon: MonetizationOnOutlinedIcon,
    bgColor: 'bg-2',
    title: 'track deals with pipelines',
  },
  calendar: {
    icon: TodayOutlinedIcon,
    bgColor: 'bg-3',
    title: 'add important events',
  },
  insights: {
    icon: InsightsOutlinedIcon,
    bgColor: 'bg-4',
    title: 'go deeper with insights',
  },
  timelines: {
    icon: AccessTimeOutlinedIcon,
    bgColor: 'bg-5',
    title: 'record history in timelines',
  },
  customize: {
    icon: AutoFixHighOutlinedIcon,
    bgColor: 'bg-6',
    title: 'customization on demand',
  },
};

type FeatureCardProps = {
  type: keyof typeof featureType;

  /**should be plain text */
  children?: ReactNode;
};

export default function FeatureCard({ type, children }: FeatureCardProps) {
  const { title, icon: Icon, bgColor } = featureType[type];

  return (
    <div className="feature-card">
      <span className={`feature-card__icon ${bgColor}`}>
        <Icon sx={{ fontSize: 44 }} color="secondary" />
      </span>

      <Text className="feature-card__title" variant="h6" fontWeight="bold">
        {title}
      </Text>
      <Text className="feature-card__desc">{children}</Text>
    </div>
  );
}
