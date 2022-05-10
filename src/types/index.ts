import { FORM_FIELD_TYPES, FORM_FIELD_PERMISSION_KEYS } from 'src/constants';

export type ID = string;

export type BaseDocument = {
  _id: ID;
  orgId: ID;
  name: string;
  createdDate: Date | string;
};

export type Profile = {
  _firstName: string;
  _lastName: string;
  _email: string;
  _role: PicklistData;
  _password: string;
  isCeo: boolean;
  notifications: Array<ID>;
} & BaseDocument;

export type NotificationType = MainDocumentType | ActivityType;
export type Notification = {
  notificationType: NotificationType;
  read: boolean;

  /** Profile the notification belongs to. */
  profileId: ID;
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
  timelineId: ID;
  owner: SearchData;
} & BaseDocument;

export type Contact = {
  firstName: string;
  lastName: string;
} & MainDocument;

export type BusinessDocument = {
  associatedContacts: Array<SearchData>;
} & MainDocument;

export type Account = {} & BusinessDocument;

export type DealStatus = 'Open' | 'Won' | 'Lost';
export type Deal = {
  value: number;
  dealStatus: PicklistData;
  currentStage: PicklistData;
  pipeline: PicklistData;
  closedDate: string | Date;
} & BusinessDocument;

export type ActivityType = 'Task' | 'Event';
export type ActivityDocument = {
  closedDate: Date | string;

  /** The documents that are related to this activity */
  relatedTo: Array<SearchData>;

  /**The profile that is in charge of this activity. */
  owner: SearchData;
} & BaseDocument;

export type Task = {
  completed: boolean;
} & ActivityDocument;

export type Event = {
  calendarId: PicklistData;
} & ActivityDocument;

export type TimelineItemType = 'Note' | 'Edit' | ActivityType;
export type TimelineItem = {
  description: string;
  itemType: TimelineItemType;
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
  _isAdmin: boolean;
  _viewContact: boolean;
  _viewAccount: boolean;
  _viewDeal: boolean;
  _createContact: boolean;
  _createAccount: boolean;
  _createDeal: boolean;
  _createEmail: boolean;
  _createEvent: boolean;
  _createTask: boolean;
  _editContact: boolean;
  _editAccount: boolean;
  _editDeal: boolean;
  _editTask: boolean;
  _editEvent: boolean;
  _deleteContact: boolean;
  _deleteAccount: boolean;
  _deleteDeal: boolean;
  _deleteEvent: boolean;
  _deleteTask: boolean;
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

export type FormFieldTypes = typeof FORM_FIELD_TYPES[number];

export type FormField = {
  inputType: FormFieldTypes;
  /**Label associated with field. */
  inputLabel: string;
  helpText: string;

  /**Stores the id of the data source to use for searching.*/
  searchSource?: ID;

  /**Used for picklists. Stores the id of the list to use for displaying picklist options. */
  listSource?: ID;

  /*validation rules for this field*/
  validation: Array<string>;

  /**The actions that can be done on an individual form field. Users will not be able to edit these. */
  permissions: Record<keyof typeof FORM_FIELD_PERMISSION_KEYS, boolean>;
} & BaseDocument;

export type FieldDisplayFieldData = {
  /**field name. */
  name: string;
  removable: boolean;
  reorderable: boolean;
};

/**How the form fields will be displayed in various settings. For e.g; for contacts, it controls
 * what will be displayed in contact form, contacts table, and what fields appear in contact infoBox.
 */
export type FieldDisplay = {
  /**Controls how the fields are displayed in a specific form(contact, account, profile, etc.) */
  form: Array<FieldDisplayFieldData>;

  /**Controls how the fields are displayed in a specific table.*/
  table: Array<FieldDisplayFieldData>;

  /**Controls how the fields are displayed in a specific info box. */
  infoBox: Array<FieldDisplayFieldData>;
} & BaseDocument;

/**All objects that can be created*/
export type CreatableObject =
  | MainDocumentType
  | ActivityType
  | Omit<TimelineItemType, ActivityType>
  | 'Form'
  | 'Profile'
  | 'Role'
  | 'Notification'
  | 'Pipeline'
  | 'List'
  | 'Validation';
