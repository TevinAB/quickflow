export type ID = string;

export type BaseDocument = {
  _id: ID;
  name: string;
  org_id: ID;
  created_date: Date | string;
};

export type Profile = {
  first_name: string;
  last_name: string;
  email: string;
  role_id: ID;
  password: string;
  is_ceo: boolean;
  notifications: Array<ID>;
} & BaseDocument;

export type NotificationType = MainDocumentType | ActivityType;
export type Notification = {
  notification_type: NotificationType;
  read: boolean;
};

type IDocFunction<T extends Object> = (data: T) => T;
export interface IDocument<U> {
  create: IDocFunction<U>;
  normalize: IDocFunction<U>;
  validate: IDocFunction<U>;
  sanitize: IDocFunction<U>;
}

export type MainDocumentType = 'Contact' | 'Deal' | 'Account';
export type MainDocument = {
  timeline_id: ID;
  owner_id: ID;
} & BaseDocument;

export type Contact = {
  first_name: string;
  last_name: string;
} & BaseDocument;

export type BusinessDocument = {
  associated_contacts: Array<SearchData>;
} & MainDocument;

export type Account = {} & BusinessDocument;

export type DealStatus = 'Open' | 'Won' | 'Lost';
export type Deal = {
  value: number;
  deal_status: DealStatus;
  current_stage: PicklistData;
  pipeline: PicklistData;
  closed_date: string | Date;
} & BusinessDocument;

export type ActivityType = 'Task' | 'Event';
export type ActivityDocument = {
  end_date: Date | string;
  related_to: Array<ID>;
  assigned_to: ID;
  involved: Array<ID>;
};

export type Task = {
  completed: boolean;
} & ActivityDocument;

export type Event = {
  calender_id: ID;
} & ActivityDocument;

export type TimelineItemType = 'Note' | 'Edit' | ActivityType;
export type TimelineItem = {
  description: string;
  item_type: TimelineItemType;
};

export type MainDocPermissions = {
  contact: boolean;
  account: boolean;
  deal: boolean;
};

export type ActivityDocPermissions = {
  event: boolean;
  task: boolean;
};

export type Role = {
  is_admin: boolean;
  view: MainDocPermissions;
  create: { email: boolean } & MainDocPermissions & ActivityDocPermissions;
  edit: MainDocPermissions & ActivityDocPermissions;
  delete_: MainDocPermissions & ActivityDocPermissions;
};

export type PicklistData = {
  value: string;
  text: string;
  __type: string;
};

export type SearchData = {
  _id: ID;
  name: string;
};

export type FormFieldTypes =
  | 'Text'
  | 'Password'
  | 'Email'
  | 'Number'
  | 'Picklist'
  | 'Search'
  | 'Url'
  | 'Date';

export type FormField = {
  input_type: FormFieldTypes;
  input_label: string;
  help_text: string;

  /**If this field can be deleted */
  deletable: boolean;

  /**Used for search fields. Stores the name of the data source to use when searching.*/
  data_source: string;

  /**Data on how to display this field in a form. */
  form_info: FormFieldMeta;

  /**Data on how to display this field in a list format. */
  list_info: FormFieldMeta;
} & BaseDocument;

type FormFieldMeta = {
  /**The order relative to the other fields. */
  order: number;
  visible: boolean;
};

export type FormData = {
  fields_data: Array<FormField>;
} & BaseDocument;
