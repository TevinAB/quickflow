import './index.css';
import { useState, useEffect } from 'react';
import { timeFromNow } from '../../utils/date';
import type { TimelineData, TimelineItemType } from '../../types';
import PickList from '../PickList';

type TimelineProps = {
  timelineData: TimelineData;
};

type FilterType = 'All' | TimelineItemType;

const filterOptions: Array<{
  text: FilterType;
  value: FilterType;
  selected: boolean;
}> = [
  { text: 'All', value: 'All', selected: true },
  { text: 'Event', value: 'Event', selected: false },
  { text: 'Note', value: 'Note', selected: false },
  { text: 'Other', value: 'Other', selected: false },
  { text: 'Task', value: 'Task', selected: false },
];

export default function Timeline({ timelineData }: TimelineProps) {
  const [filteredData, setFilteredData] = useState(timelineData);
  const [filterType, setFilterType] = useState<FilterType>('All');

  useEffect(() => {
    //move outside
    type argType = typeof timelineData[0]['categoryItems'][0];
    let filterFunction: (item: argType) => boolean;

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

    const res = timelineData
      .map((group) => {
        return {
          categoryTitle: group.categoryTitle,
          categoryItems: group.categoryItems.filter(filterFunction),
        };
      })
      .reverse();

    setFilteredData(res);
  }, [filterType, timelineData]);

  return (
    <div className="timeline">
      <div className="timeline-filter">
        <div className="timeline-filter__wrapper">
          <PickList
            optionsData={filterOptions}
            afterChange={(value) => setFilterType(value as FilterType)}
          />
        </div>
      </div>
      {filteredData.map((dateGroup) => (
        <TimelineGroup dateGroup={dateGroup} />
      ))}
    </div>
  );
}

type TimelineGroupProps = {
  dateGroup: Pick<TimelineData[0], 'categoryItems' | 'categoryTitle'>;
};

function TimelineGroup({ dateGroup }: TimelineGroupProps) {
  const { categoryItems, categoryTitle } = dateGroup;
  return (
    <div>
      <div className="timeline-group__title">
        {categoryItems.length > 0 && categoryTitle}
      </div>
      <div className="timeline-group__items">
        {categoryItems.map((item) => {
          let headClasses = 'tl-item__head';
          let itemClasses = 'tl-group-items__item';

          headClasses += ' item--note__head';
          itemClasses += ' item--note';

          return (
            <div className={itemClasses}>
              <div className={headClasses}>
                <div className="tl-item__title">{item.title}</div>
                <span className="tl-item__date" title={item.date}>
                  {timeFromNow(item.date)}
                </span>
              </div>
              <div className={'tl-item__body'}>{item.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
