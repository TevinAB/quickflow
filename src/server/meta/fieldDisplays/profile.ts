const profile = {
  name: 'profile',
  form: [
    { name: '_firstName', removable: false, reorderable: false },
    { name: '_lastName', removable: false, reorderable: true },
    { name: '_email', removable: false, reorderable: true },
    { name: '_password', removable: false, reorderable: true },
    { name: '_role', removable: false, reorderable: true },
  ],
  table: [
    { name: '_firstName', removable: false, reorderable: true },
    { name: '_lastName', removable: false, reorderable: true },
    { name: '_email', removable: false, reorderable: true },
  ],
  infoBox: [{ name: '_email', removable: true, reorderable: true }],
};
export default profile;
