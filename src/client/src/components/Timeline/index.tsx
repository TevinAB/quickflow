import './index.css';
import { useState, useEffect } from 'react';
import { timeFromNow } from '../../utils/date';
import type {
  TimelineItem,
  TimelineFormattedData,
  TimelineFilterType,
} from '../../types';
import PickList from '../PickList';
import { timelineFilterOptions } from '../../utils/filterOptions';

type TimelineProps = {
  timelineFormattedData: TimelineFormattedData;
};

export default function Timeline({ timelineFormattedData }: TimelineProps) {
  const [filteredData, setFilteredData] = useState(timelineFormattedData);
  const [filterType, setFilterType] = useState<TimelineFilterType>('All');

  useEffect(() => {
    let filterFunction: (item: TimelineItem) => boolean;

    switch (filterType) {
      case 'Note':
        filterFunction = (item) => {
          return item.item_type.toLowerCase() === 'note';
        };
        break;
      case 'Other':
        filterFunction = (item) => {
          return item.item_type.toLowerCase() === 'other';
        };
        break;
      default:
        filterFunction = (item) => {
          return true;
        };
        break;
    }

    const res = timelineFormattedData
      .map((group) => {
        return {
          categoryTitle: group.categoryTitle,
          categoryItems: group.categoryItems.filter(filterFunction),
        };
      })
      .reverse(); //for reverse chronological order

    setFilteredData(res);
  }, [filterType, timelineFormattedData]);

  return (
    <div className="timeline">
      <div className="timeline-filter">
        <div className="timeline-filter__wrapper">
          <PickList
            optionsData={timelineFilterOptions}
            afterChange={(value) => setFilterType(value as TimelineFilterType)}
          />
        </div>
      </div>
      <div className="timeline__items">
        {filteredData.map((dateGroup) => (
          <TimelineGroup dateGroup={dateGroup} />
        ))}
      </div>
    </div>
  );
}

type TimelineGroupProps = {
  dateGroup: Pick<TimelineFormattedData[0], 'categoryItems' | 'categoryTitle'>;
};

function TimelineGroup({ dateGroup }: TimelineGroupProps) {
  const { categoryItems, categoryTitle } = dateGroup;
  return (
    <div>
      <div className="timeline-group__title">
        {categoryItems.length > 0 && categoryTitle}
      </div>
      <div className="timeline-group__items">
        {categoryItems
          .map((item) => {
            let headClasses = 'tl-item__head';
            let itemClasses = 'tl-group-items__item';

            headClasses += ' item--note__head';
            itemClasses += ' item--note';

            return (
              <div className={itemClasses}>
                <div className={headClasses}>
                  <div className="tl-item__title">{item.name}</div>
                  <span className="tl-item__date" title={item.date}>
                    {timeFromNow(item.date)}
                  </span>
                </div>
                <div className={'tl-item__body'}>{item.body}</div>
              </div>
            );
          })
          .reverse()}
      </div>
    </div>
  );
}
