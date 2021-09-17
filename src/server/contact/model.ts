import { Schema, model } from 'mongoose';

export interface Contact {
  name: string;
  orgId: string;
}

const contactSchema = new Schema<Contact>({
  name: { type: String, required: true },
  orgId: { type: String, required: true },
});

const contactModel = model<Contact>('contact', contactSchema);

export default contactModel;
