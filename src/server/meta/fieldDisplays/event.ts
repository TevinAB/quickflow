const event = {
  name: 'event',
  form: [
    { name: 'name', removable: false, reorderable: true },
    { name: 'description', removable: false, reorderable: true },
    { name: 'startDate', removable: false, reorderable: true },
    { name: 'closedDate', removable: false, reorderable: true },
    { name: 'involved', removable: false, reorderable: true },
    { name: 'owner', removable: false, reorderable: true },
  ],
  table: [
    { name: 'name', removable: false, reorderable: true },
    { name: 'description', removable: true, reorderable: true },
    { name: 'startDate', removable: true, reorderable: true },
    { name: 'closedDate', removable: true, reorderable: true },
    { name: 'owner', removable: true, reorderable: true },
  ],
  infoBox: [
    { name: 'startDate', removable: true, reorderable: true },
    { name: 'closedDate', removable: true, reorderable: true },
  ],
};
export default event;
