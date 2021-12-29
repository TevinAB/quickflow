const contact = {
  name: 'contact',
  form: [
    { name: 'firstName', removable: false, reorderable: true },
    { name: 'lastName', removable: false, reorderable: true },
    { name: 'email', removable: true, reorderable: true },
    { name: 'phoneNumber', removable: true, reorderable: true },
    { name: 'company', removable: true, reorderable: true },
    { name: 'jobTitle', removable: true, reorderable: true },
    { name: 'owner', removable: false, reorderable: true },
  ],
  table: [
    { name: 'name', removable: false, reorderable: true },
    { name: 'email', removable: true, reorderable: true },
    { name: 'phoneNumber', removable: true, reorderable: true },
    { name: 'company', removable: true, reorderable: true },
    { name: 'jobTitle', removable: true, reorderable: true },
    { name: 'owner', removable: true, reorderable: true },
  ],
  infoBox: [
    { name: 'email', removable: true, reorderable: true },
    { name: 'phoneNumber', removable: true, reorderable: true },
    { name: 'company', removable: true, reorderable: true },
    { name: 'jobTitle', removable: true, reorderable: true },
    { name: 'address', removable: true, reorderable: true },
  ],
};
export default contact;
