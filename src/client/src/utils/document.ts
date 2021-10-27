import type {
  Deal,
  TimelineData,
  BaseDocument,
  DocumentType,
  Contact,
} from '../types';

function newBaseDocumentState(documentType: DocumentType) {
  return {
    _id: '',
    __type: documentType,
    name: '',
    timeline_id: '',
    owner: {
      text: '',
      value: '',
    },
  } as BaseDocument;
}

export function newTimelineState() {
  return {
    _id: '',
    parent_id: '',
    org_id: '',
    timeline_items: [],
  } as TimelineData;
}

export function newContactState() {
  return {
    ...newBaseDocumentState('Contact'),
    first_name: '',
    last_name: '',
  } as Contact;
}

export function newDealState() {
  return {
    ...newBaseDocumentState('Deal'),
    value: 0,
    pipeline: '',
    created_date: '',
    closed_date: '',
  } as Deal;
}
