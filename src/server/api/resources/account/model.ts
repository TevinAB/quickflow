import { model, Schema } from 'mongoose';

export interface Account {
  orgId: string;
  owner: { firstName: string; lastName: string };
  created: Schema.Types.Date;
  company: string;
  associatedContacts: [
    { _id: Schema.Types.ObjectId; firstName: string; lastName: string }
  ];
}

const basicSchema = new Schema<Account>(
  {
    orgId: { type: String, required: true },
    company: { type: String, required: true },
    associatedContacts: [],
  },
  { strict: false }
);

const accountModel = model<Account>('account', basicSchema);

export default accountModel;
