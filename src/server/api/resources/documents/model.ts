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
    { _id: Schema.Types.ObjectId; first_name: string; last_name: string }
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
  closed_date: Schema.Types.Date;
  associated_contacts: [
    { _id: Schema.Types.ObjectId; first_name: string; last_name: string }
  ];
}

const dealSchema = new Schema<Deal>(
  {
    value: { type: Number, required: true },
    deal_status: String,
    current_stage: { type: Number, required: true },
    pipeline: { type: Schema.Types.ObjectId, required: true },
    closed_date: { type: Schema.Types.Date, required: false },
    associated_contacts: [],
  },
  { strict: false, collection: COLLECTION_NAME }
);

export interface BaseDocument {
  name: string;
  org_id: Schema.Types.ObjectId;
  timeline_id: Schema.Types.ObjectId;
  created_date: Schema.Types.Date;
  owner: { __type: string; text: string; value: string };
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
    created_date: { type: Schema.Types.Date, default: Date.now },
    owner: {
      type: {
        __type: String,
        text: String,
        value: String,
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
export const dealModel = baseModel.discriminator('Deal', dealSchema);
