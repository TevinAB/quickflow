export type ID = string;

export type BaseDocument = {
  _id: ID;
  org_id: ID;
  name: string;
  created_date: Date | string;
};

export type Profile = {
  first_name: string;
  last_name: string;
  email: string;
  role_id: PicklistData;
  password: string;
  is_ceo: boolean;
  notifications: Array<ID>;
} & BaseDocument;

export type NotificationType = MainDocumentType | ActivityType;
export type Notification = {
  notification_type: NotificationType;
  read: boolean;

  /** Profile the notification belongs to. */
  profile_id: ID;
} & BaseDocument;

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
  owner_id: PicklistData;
} & BaseDocument;

export type Contact = {
  first_name: string;
  last_name: string;
} & MainDocument;

export type BusinessDocument = {
  associated_contacts: Array<SearchData>;
} & MainDocument;

export type Account = {} & BusinessDocument;

export type DealStatus = 'Open' | 'Won' | 'Lost';
export type Deal = {
  value: number;
  deal_status: PicklistData;
  current_stage: PicklistData;
  pipeline: PicklistData;
  closed_date: string | Date;
} & BusinessDocument;

export type ActivityType = 'Task' | 'Event';
export type ActivityDocument = {
  end_date: Date | string;

  /** The documents that are related to this activity */
  related_to: Array<SearchData>;

  /**The profile that is in charge of this activity. */
  assigned_to: SearchData;

  /**Other profiles involved with this task. */
  involved: Array<SearchData>;
} & BaseDocument;

export type Task = {
  completed: boolean;
} & ActivityDocument;

export type Event = {
  calender_id: PicklistData;
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
  search_source?: string;

  /**Used for picklists. Stores the name of the list to use for displaying picklist options. */
  list_source?: string;

  /**The position in the form that this field will appear at: 1,2,3,... */
  form_order: number;
  /**If this field is visible in a form */
  form_visible: boolean;

  /**The position in a table format. */
  column_order: number;
  /**If this field is visible in a table format */
  column_visible: number;
} & BaseDocument;

export type FormData = {
  fields_data: Array<FormField>;
} & BaseDocument;

/**All objects that can be created */
export type CreatableObject =
  | MainDocumentType
  | ActivityType
  | Omit<TimelineItemType, ActivityType>
  | 'Form'
  | 'Profile'
  | 'Role'
  | 'Notification';
