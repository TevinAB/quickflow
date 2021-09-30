import { Schema, model } from 'mongoose';

interface TimelineItem {
  title: string; // email sent by ... or ... note added by
  itemType: string; //Used for the client-side when creating components  note, email, edit
  initiator: string; // the employee profile that triggered the action being added
  date: Schema.Types.Date; //date modified
  itemBody: [{}] | string; // displayed in timeline ui. arr obj --> {fieldName: string, from: string, to: string}
}

const timelineItemSchema = new Schema<TimelineItem>();

/**
 * timeline model
 * {
 *  parentId: '',
 *  list: [],//stores timeline objects
 * }
 */

export interface Contact {
  firstName: string;
  lastName: string;
  name: string;
  orgId: string;
  owner: { firstName: string; lastName: string };
  created: Schema.Types.Date;
}

const contactSchema = new Schema<Contact>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    name: { type: String, required: true },
    orgId: { type: String, required: true },
  },
  { strict: false }
);

const contactModel = model<Contact>('contact', contactSchema);

export default contactModel;
