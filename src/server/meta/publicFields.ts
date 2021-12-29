const fields = [
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: true,
    },
    inputLabel: 'First Name',
    inputType: 'Text',
    name: 'firstName',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: true,
    },
    inputLabel: 'Last Name',
    inputType: 'Text',
    name: 'lastName',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Email',
    inputType: 'Email',
    name: 'email',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: true,
    },
    inputLabel: 'Phone Number',
    inputType: 'Number',
    name: 'phoneNumber',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: true,
      editValidation: true,
    },
    inputLabel: 'Job Title',
    inputType: 'Text',
    name: 'jobTitle',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: true,
      editValidation: true,
    },
    inputLabel: 'Company',
    inputType: 'Text',
    name: 'company',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      editSearchSource: false,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Owner',
    inputType: 'Search',
    name: 'owner',
    helpText: '',
    searchSource: 'Profile',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: true,
    },
    inputLabel: 'Name',
    inputType: 'Text',
    name: 'name',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: true,
    },
    inputLabel: 'Address',
    inputType: 'Text',
    name: 'address',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      editSearchSource: false,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Associated Contacts',
    inputType: 'Search',
    name: 'associatedContacts',
    helpText: '',
    searchSource: 'Contact',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: true,
      editValidation: true,
    },
    inputLabel: 'Website',
    inputType: 'Url',
    name: 'website',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Value',
    inputType: 'Number',
    name: 'value',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      editListSource: false,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Deal Status',
    inputType: 'Picklist',
    name: 'dealStatus',
    helpText: '',
    listSource: 'dealStatus',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Current Stage',
    inputType: 'Number',
    name: 'currentStage',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      editListSource: false,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Pipeline',
    inputType: 'Picklist',
    name: 'pipeline',
    helpText: '',
    listSource: 'pipelines',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Closed Date',
    inputType: 'Date',
    name: 'closedDate',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      editListSource: false,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Currency',
    inputType: 'Picklist',
    name: 'currency',
    helpText: '',
    listSource: 'currency',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      editSearchSource: false,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Related To',
    inputType: 'Search',
    name: 'relatedTo',
    helpText: '',
    searchSource: 'Contact',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Completed',
    inputType: 'Checkbox',
    name: 'completed',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Start Date',
    inputType: 'Date',
    name: 'startDate',
    helpText: '',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      editListSource: false,
      isDeletable: false,
      editValidation: false,
    },
    inputLabel: 'Calendar Id',
    inputType: 'Picklist',
    name: 'calendarId',
    helpText: '',
    listSource: 'calendars',
    validation: [],
  },
  {
    permissions: {
      public: true,
      editInputType: false,
      editInputLabel: true,
      editHelpText: true,
      isDeletable: false,
      editValidation: true,
    },
    inputLabel: 'Description',
    inputType: 'Text',
    name: 'description',
    helpText: '',
    validation: [],
  },
];
export default fields;
