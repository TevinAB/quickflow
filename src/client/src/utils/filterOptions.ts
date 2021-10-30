import type { TimelineFilterType } from './../types/index';

export const searchTypeOptions = [
  { text: 'Contact', value: 'Contact', selected: true, __type: 'Picklist' },
  { text: 'Account', value: 'Account', selected: false, __type: 'Picklist' },
  { text: 'Deal', value: 'Deal', selected: false, __type: 'Picklist' },
  { text: 'Profile', value: 'Profile', selected: false, __type: 'Picklist' },
];

export const timelineFilterOptions: Array<{
  text: TimelineFilterType;
  value: TimelineFilterType;
  selected: boolean;
  __type: string;
}> = [
  { text: 'All', value: 'All', selected: true, __type: 'Picklist' },
  { text: 'Event', value: 'Event', selected: false, __type: 'Picklist' },
  { text: 'Note', value: 'Note', selected: false, __type: 'Picklist' },
  { text: 'Other', value: 'Other', selected: false, __type: 'Picklist' },
  { text: 'Task', value: 'Task', selected: false, __type: 'Picklist' },
];
