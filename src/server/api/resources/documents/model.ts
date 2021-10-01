import { Schema, model } from 'mongoose';

const COLLECTION_NAME = 'document';

export interface Contact {
  first_name: string;
  last_name: string;
}

const contactSchema = new Schema<Contact>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
  },
  { strict: false, collection: COLLECTION_NAME }
);

export interface Account {
  associated_contacts: [
    { _id: Schema.Types.ObjectId; firstName: string; lastName: string }
  ];
}

const accountSchema = new Schema<Account>(
  {
    associated_contacts: [],
  },
  { strict: false, collection: COLLECTION_NAME }
);

export interface Deal {
  value: number;
  deal_status: string;
  current_stage: number;
  pipeline: Schema.Types.ObjectId;
  close_date: Schema.Types.Date;
  associated_contacts: [
    { _id: Schema.Types.ObjectId; firstName: string; lastName: string }
  ];
}

const dealSchema = new Schema<Deal>(
  {
    value: { type: Number, required: true },
    deal_status: String,
    current_stage: { type: Number, required: true },
    pipeline: { type: Schema.Types.ObjectId, required: true },
    close_date: { type: Schema.Types.Date, required: false },
    associated_contacts: [],
  },
  { strict: false, collection: COLLECTION_NAME }
);

export interface BaseDocument {
  name: string;
  org_id: Schema.Types.ObjectId;
  timeline_id: Schema.Types.ObjectId;
  created: Schema.Types.Date;
  owner: { first_name: string; last_name: string; _id: Schema.Types.ObjectId };
}

export const baseSchema = new Schema<BaseDocument>(
  {
    name: { type: String, required: true },
    org_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    timeline_id: {
      type: Schema.Types.ObjectId,
    },
    created: { type: Schema.Types.Date, default: Date.now },
    owner: {
      type: {
        first_name: String,
        last_name: String,
        _id: Schema.Types.ObjectId,
      },
    },
  },
  {
    strict: false,
    collection: COLLECTION_NAME,
    discriminatorKey: '__type',
    autoIndex: true,
  }
);

baseSchema.index({ name: 'text' });

export const baseModel = model('documents', baseSchema);
baseModel.discriminator('Contact', contactSchema);
baseModel.discriminator('Account', accountSchema);
baseModel.discriminator('Deal', dealSchema);
