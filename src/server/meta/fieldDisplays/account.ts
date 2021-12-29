const account = {
  name: 'account',
  form: [
    { name: 'name', removable: false, reorderable: true },
    { name: 'phoneNumber', removable: true, reorderable: true },
    { name: 'address', removable: true, reorderable: true },
    { name: 'owner', removable: false, reorderable: true },
    { name: 'associatedContacts', removable: false, reorderable: true },
    { name: 'website', removable: true, reorderable: true },
  ],
  table: [
    { name: 'name', removable: false, reorderable: true },
    { name: 'phoneNumber', removable: true, reorderable: true },
    { name: 'address', removable: true, reorderable: true },
    { name: 'associatedContacts', removable: true, reorderable: true },
    { name: 'owner', removable: true, reorderable: true },
    { name: 'website', removable: true, reorderable: true },
  ],
  infoBox: [
    { name: 'phoneNumber', removable: true, reorderable: true },
    { name: 'address', removable: true, reorderable: true },
    { name: 'website', removable: true, reorderable: true },
  ],
};
export default account;
