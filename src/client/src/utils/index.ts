import type {
  SearchType,
  ActivityType,
  FormFieldDataSources,
  FormType,
  FormFieldData,
  InfoData,
  RequestError,
} from './../types/index';
import numeral from 'numeral';
import { getProfileMany } from '../services/profiles';
import { getRoleMany } from '../services/roles';
import { getFormData } from '../services/forms';
import { getPipelineMany } from '../services/pipelines';

import {
  loginFormData,
  signUpFormData,
  noteFormData,
  formFieldFormData,
} from './tempFormData';

import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { getDocumentOne } from '../services/document';

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
    __type: string;
  }> = [];

  rawData.forEach((item) => {
    const obj = {
      text: item[options.textKey],
      value: item[options.valueKey],
      selected: checkPropEqual(item, options.selected),
      __type: 'Picklist',
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

export type nameIdPair = {
  name: string;
  _id: string;
};

const dealStatusOptions: Array<nameIdPair> = [
  { name: 'Open', _id: 'Open' },
  { name: 'Won', _id: 'Won' },
  { name: 'Lost', _id: 'Lost' },
];

//field types for picklist when creating a new form field
const formFieldTuple = [
  'Text',
  'Password',
  'Email',
  'Number',
  'Picklist',
  'Assoc_Contact',
  'Url',
  'Date',
];

//picklist source data when creating a new form field of type picklist
const formFieldSourceTuple = [
  'Roles',
  'Profiles',
  'Pipelines',
  'Currency',
  'Field Types',
  'Field Sources',
];
function getFieldOptions(list: Array<string>) {
  const result: Array<nameIdPair> = [];

  for (let key of list) {
    result.push({ name: key, _id: key });
  }
  return result;
}

export function selectDataSource(source: FormFieldDataSources, token: string) {
  switch (source) {
    case 'Profiles':
      return (async function () {
        const tempData = await getProfileMany(token);

        if (!tempData) return { result: [] as Array<nameIdPair> };

        return { result: tempData.data.result as Array<nameIdPair> };
      })();

    case 'Roles':
      return (async function () {
        const tempData = await getRoleMany(token);

        if (!tempData) return { result: [] as Array<nameIdPair> };

        return { result: tempData.data.result as Array<nameIdPair> };
      })();

    case 'Pipelines':
      return (async function () {
        const response = await getPipelineMany(token);

        if (!response) return { result: [] as Array<nameIdPair> };

        return {
          result: response.data.result.pipeline_data as Array<nameIdPair>,
        };
      })();

    // case 'Pipeline Stage':
    //   break

    case 'Deal Status':
      return Promise.resolve({ result: dealStatusOptions });

    case 'Field Types':
      return Promise.resolve({
        result: getFieldOptions(formFieldTuple),
      });

    case 'Field Sources':
      return Promise.resolve({
        result: getFieldOptions(formFieldSourceTuple),
      });
  }

  return Promise.resolve({ result: [] as Array<nameIdPair> });
}

export async function getForm_Data(formType: FormType, token: string) {
  switch (formType) {
    case 'Account':
    case 'Contact':
    case 'Deal':
      return (await getFormData(formType, token))?.data.result
        .form_data as Array<FormFieldData>;

    case 'Login':
      return (await Promise.resolve(loginFormData))
        .form_data as unknown as Array<FormFieldData>;

    case 'SignUp':
      return (await Promise.resolve(signUpFormData))
        .form_data as unknown as Array<FormFieldData>;

    case 'Note':
      return (await Promise.resolve(noteFormData))
        .form_data as unknown as Array<FormFieldData>;

    case 'FormField':
      return (await Promise.resolve(formFieldFormData))
        .form_data as unknown as Array<FormFieldData>;
  }

  return (await Promise.resolve([])) as unknown as Array<FormFieldData>;
}

export async function getItemData(
  _id: string,
  formType: FormType,
  token: string
) {
  switch (formType) {
    case 'Contact':
    case 'Account':
    case 'Deal':
      return (await getDocumentOne(formType, _id, token))?.data.result;
  }

  return await Promise.resolve({});
}

export function infoWidgetComponentAdapter<T = any>(
  data: Record<string, any>,
  blacklistKeys: Array<string>,
  valueSetter?: (arg: T) => string
) {
  const result: Array<InfoData> = [];

  for (let key in data) {
    if (data.hasOwnProperty(key) && !blacklistKeys.includes(key)) {
      result.push({
        label: keyToLabel(key),
        value: valueSetter ? valueSetter(data[key]) : data[key],
      });
    }
  }

  return result;
}

export function keyToLabel(key: string) {
  return key
    .split('_')
    .filter((text) => text !== '')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export function getRequestErrorData(error: RequestError) {
  const statusCode = error.response?.status || 400;
  let message;

  if (statusCode !== 404 && statusCode !== 400) {
    message = 'Oops, Something went wrong.';
  } else {
    message = error.response?.data.message || '';
  }

  return { statusCode, message };
}

export function sortAscending(a: number, b: number) {
  return a - b;
}

export function sortDescending(a: number, b: number) {
  return b - a;
}
