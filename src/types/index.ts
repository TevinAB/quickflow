import { FORM_FIELD_TYPES } from 'src/constants';

export type ID = string;

export type BaseDocument = {
  _id: ID;
  orgId: ID;
  name: string;
  createdDate: Date | string;
};

export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  roleId: PicklistData;
  password: string;
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
  ownerId: SearchData;
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
  endDate: Date | string;

  /** The documents that are related to this activity */
  relatedTo: Array<SearchData>;

  /**The profile that is in charge of this activity. */
  assignedTo: SearchData;

  /**Other profiles involved with this task. */
  involved: Array<SearchData>;
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
  isAdmin: boolean;
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

  /**The position in the form that this field will appear at: 1,2,3,... */
  formOrder: number;
  /**If this field is visible in a form */
  visibleInForm: boolean;

  /**The position in a table format. */
  tableOrder: number;
  /**If this field is visible in a table format */
  visibleInTable: boolean;

  /**The position it appears in the info display box*/
  infoBoxOrder: number;
  /**If this is to be shown in info display boxes*/
  visibleInInfoBox: boolean;

  /*validation rules for this field*/
  validation: Array<string>;

  /**The actions that can be done on an individual form field. Users will not be able to edit these. */
  permissions: {
    /**If the input type be changed*/
    editInputType: boolean;

    /**If the input label can be changed.*/
    editInputLabel: boolean;

    /*If the help text can be changed*/
    editHelpText: boolean;

    /**If the list source can be changed. For picklists.*/
    editListSource: boolean;

    /*If the search source can be changed. For search fields.**/
    editSearchSource: boolean;

    /**If this field can be hidden in form.*/
    editFormVisibility: boolean;
    /**If the order in the form can be changed.*/
    editFormOrder: boolean;

    /** If this can be hidden in table views*/
    editTableVisibility: boolean;
    /**If the order in the table can be changed.*/
    editTableOrder: boolean;

    /**If this can be hidden in info boxes*/
    editInfoBoxVisibility: boolean;
    /**If the order in the info box can be changed*/
    editInfoBoxOrder: boolean;

    /**If this field can be deleted */
    isDeletable: boolean;

    /*If validation rules can be edited.**/
    editValidation: boolean;
  };
} & BaseDocument;

export type FormData = {
  fieldsData: Array<FormField>;
} & BaseDocument;

/**All objects that can be created */
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
