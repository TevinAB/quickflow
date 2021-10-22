import { CancelToken, CancelTokenSource } from 'axios';
import timeline from '../mock-sw/timeline/response/getTimeline.json';
import { groupBy } from '../utils';

export type Cancel_Token = CancelToken;
export type Cancel_Token_Source = CancelTokenSource;

export type DocumentType = 'Contact' | 'Account' | 'Deal';

export type DealRangeTypes = 'Year';
export type DealCategory = 'Open' | 'Won' | 'Lost' | 'Closed' | 'All';

export type Deal = {
  value: number;
  timeline_id: string;
  category: DealCategory;
  created: string;
  closed: string;
} & SearchResultItem;

export type GroupedDeals = Array<{
  categoryTitle: string;
  categoryItems: Deal[];
}>;

export type FormType = DocumentType;

export type ActivityType = 'Task' | 'Event';

export type ActivityBase = {
  start_date: string;
  end_date: string;
  description: string;
};
export type Task = {
  completed: boolean;
} & SearchResultItem &
  ActivityBase;

export type Event = SearchResultItem & ActivityBase;

export type SearchType = 'Profile' | DocumentType;

//A work around to take the type of a generic function.
function wrapperGeneric() {
  const obj = timeline.timeline_items;

  return groupBy<typeof obj[0]>(obj, (item) => {
    return 'Doesnt actually need to return anything here.';
  });
}
export type TimelineData = ReturnType<typeof wrapperGeneric>;

export type TimelineItemType = 'Note' | 'Other' | ActivityType;

export type SearchResultItem = {
  _id: string;
  __type: SearchType;
  name: string;
};

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  org_name: string;
}

export interface ApiError {
  message: string;
}

export interface Notification {
  title: string;
  read: boolean;
  type: string;
  added: string | Date;
}
