export const FORM_FIELD_TYPES = [
  'Text',
  'Password',
  'Email',
  'Number',
  'Picklist',
  'Search',
  'Url',
  'Date',
  'Checkbox',
] as const;

/**This is here to make it easier to change edit permission keys and have them be consistent with
 * the formBuilder tool and the permissions object in the FormField type.
 * The values being set to false here isn't significant; it could be anything because they won't be used.
 */
export const FORM_FIELD_PERMISSION_KEYS = {
  /** If this field is visible when viewing all form fields in application edit mode. */
  public: false,

  /**If the input type be changed*/
  editInputType: false,

  /**If the input label can be changed.*/
  editInputLabel: false,

  /*If the help text can be changed*/
  editHelpText: false,

  /**If the list source can be changed. For picklists.*/
  editListSource: false,

  /*If the search source can be changed. For search fields.**/
  editSearchSource: false,

  /**If this field can be deleted */
  isDeletable: false,

  /*If validation rules can be edited.**/
  editValidation: false,
};

export const SEARCH_SOURCES = [
  'Contact',
  'Account',
  'Deal',
  'Profile',
  'Role',
  'Lists',
  'Validation',
  'All',
] as const;
