import { model, Schema } from 'mongoose';

//deals will also have a 'closed' date added when the status is set to close.
export interface Deal {
  orgId: string;
  owner: { firstName: string; lastName: string };
  title: string;
  value: number;
  deal_status: string;
  current_stage: number;
  pipeline: Schema.Types.ObjectId;
  created: Schema.Types.Date;
  dueDate: Schema.Types.Date;
  associated_contacts: [
    { _id: Schema.Types.ObjectId; firstName: string; lastName: string }
  ];
}

const basicSchema = new Schema<Deal>(
  {
    orgId: { type: String, required: true },
    owner: {},
    title: { type: String, required: true },
    value: { type: Number, required: true },
    deal_status: String,
    current_stage: { type: Number, required: true },
    pipeline: { type: Schema.Types.ObjectId, required: true },
    associated_contacts: [],
  },
  { strict: false }
);

const dealModel = model<Deal>('deal', basicSchema);

export default dealModel;
