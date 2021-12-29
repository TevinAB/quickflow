const deal = {
  name: 'deal',
  form: [
    { name: 'name', removable: false, reorderable: true },
    { name: 'value', removable: false, reorderable: true },
    { name: 'owner', removable: false, reorderable: true },
    { name: 'dealStatus', removable: false, reorderable: true },
    { name: 'closedDate', removable: false, reorderable: true },
    { name: 'pipeline', removable: false, reorderable: true },
    { name: 'currentStage', removable: false, reorderable: true },
    { name: 'associatedContacts', removable: false, reorderable: true },
    { name: 'currency', removable: false, reorderable: true },
  ],
  table: [
    { name: 'name', removable: false, reorderable: true },
    { name: 'value', removable: true, reorderable: true },
    { name: 'owner', removable: true, reorderable: true },
    { name: 'dealStatus', removable: true, reorderable: true },
    { name: 'closedDate', removable: true, reorderable: true },
    { name: 'pipeline', removable: true, reorderable: true },
    { name: 'currentStage', removable: true, reorderable: true },
    { name: 'associatedContacts', removable: true, reorderable: true },
    { name: 'currency', removable: true, reorderable: true },
  ],
  infoBox: [{ name: 'closedDate', removable: true, reorderable: true }],
};
export default deal;
