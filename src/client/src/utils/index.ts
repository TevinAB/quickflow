import { SearchType, ActivityType } from './../types/index';
import numeral from 'numeral';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export function debounce(callback: () => void, delay: number) {
  let timer: NodeJS.Timeout;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}

export function numberFormat(value: number | string, format: string) {
  return numeral(value).format(format);
}

/**
 * Group objects by categories created from the categoryKey function
 */
export function groupBy<T extends Object>(
  data: Array<T>,
  categoryKey: (item: T) => string
) {
  const result: Record<
    string,
    { categoryTitle: string; categoryItems: Array<T> }
  > = {};

  data.forEach((item) => {
    const category = categoryKey(item);

    if (result[category]) {
      result[category].categoryItems.push(item);
    } else {
      result[category] = {
        categoryTitle: category,
        categoryItems: [item],
      };
    }
  });

  return Object.values(result);
}

const icons: Record<SearchType | ActivityType, typeof ContactPageOutlinedIcon> =
  {
    Account: BusinessOutlinedIcon,
    Contact: ContactPageOutlinedIcon,
    Deal: MonetizationOnOutlinedIcon,
    Event: TodayOutlinedIcon,
    Task: AssignmentTurnedInOutlinedIcon,
    Profile: PersonOutlineOutlinedIcon,
  };

export function getIcon(type: keyof typeof icons) {
  return icons[type];
}

interface PicklistConvertOptions<U> {
  valueKey: keyof U;
  textKey: keyof U;
  selected?: Partial<Record<keyof U, any>>;
}

export function toPicklistData<T extends Object>(
  rawData: Array<T>,
  options: PicklistConvertOptions<T>
) {
  const result: Array<{
    value: T[keyof T];
    text: T[keyof T];
    selected: boolean;
  }> = [];

  rawData.forEach((item) => {
    const obj = {
      text: item[options.textKey],
      value: item[options.valueKey],
      selected: checkPropEqual(item, options.selected),
    };

    result.push(obj);
  });

  return result;

  function checkPropEqual(item: T, selected: typeof options.selected) {
    for (let prop in selected) {
      if (selected.hasOwnProperty) {
        if (selected.hasOwnProperty(prop)) {
          if (selected[prop] !== item[prop]) {
            return false;
          }
        }
      } else {
        return false;
      }
    }

    return true;
  }
}
