import { CancelToken, CancelTokenSource, AxiosError } from 'axios';
import timeline from '../mock-sw/timeline/response/getTimeline.json';
import { groupBy } from '../utils';

export type Cancel_Token = CancelToken;
export type Cancel_Token_Source = CancelTokenSource;
export type RequestError = AxiosError<ApiError>;

export type BaseDocument = {
  _id: string;
  __type: DocumentType;
  name: string;
  timeline_id: string;
  owner: { text: string; value: string };
};

export type Contact = {
  first_name: string;
  last_name: string;
} & BaseDocument;

export type Account = {
  associated_contacts?: Array<{ first_name: string; last_name: string }>;
};

//profile type

export type DocumentType = 'Contact' | 'Account' | 'Deal';
export type DocumentStoreState<T extends BaseDocument> = {
  documentData: T;
  timelineData: TimelineData;
  isLoading: boolean;
  documentLoadError: boolean;
  errorMessage?: string;
};
export type DocumentThunkArgs = {
  documentId: string;
  token: string;
};

export type DealRangeTypes = 'Year';
export type DealStatus = 'Open' | 'Won' | 'Lost';
export type DealCategory = DealStatus | 'All';

export type Deal = {
  value: number;
  timeline_id: string;
  deal_status: DealStatus;
  pipeline: string;
  created_date: string;
  closed_date: string;
} & BaseDocument &
  Pick<Account, 'associated_contacts'>;

export type GroupedDeals = Array<{
  categoryTitle: string;
  categoryItems: Deal[];
}>;

export type FormMode = 'New' | 'Edit' | 'none';
export type FormType =
  | DocumentType
  | 'Note'
  | 'Event'
  | 'Task'
  | 'Login'
  | 'SignUp'
  | 'FormField'
  | 'none';

export type FormFieldTypes =
  | 'Text'
  | 'Password'
  | 'Email'
  | 'Number'
  | 'Picklist'
  | 'Assoc_Contact'
  | 'Url'
  | 'Date';

export type FormFieldDataSources =
  | 'Roles'
  | 'Profiles'
  | 'Contacts'
  | 'Pipelines'
  | 'Currency'
  | 'Deal Status'
  | 'Field Types'
  | 'Field Sources';

export type FormFieldData = {
  form: {
    order: number;
    visible: boolean;
  };
  list: {
    order: number;
    visible: boolean;
  };
  input_type: FormFieldTypes;
  input_label: string;
  help_text: string;
  field_name: string;
  deletable: boolean;
  data_source: FormFieldDataSources;
  _id: string;
};

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

export type TimelineItem = typeof timeline.timeline_items[0];
export type TimelineData = typeof timeline;

//A work around to take the type of a generic function.
function wrapperGeneric() {
  const obj = timeline.timeline_items;

  return groupBy<typeof obj[0]>(obj, (item) => {
    return 'Doesnt actually need to return anything here.';
  });
}
export type TimelineFormattedData = ReturnType<typeof wrapperGeneric>;

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

export interface HttpRequestMetaData {
  initiator?: string;
}

export interface Notification {
  title: string;
  read: boolean;
  type: string;
  added: string | Date;
}

export type PicklistOption = {
  value: string;
  text: string;
  selected: boolean;
};

export type InfoData = {
  label: string;
  value: string | number;
};
