import { model, Schema } from 'mongoose';

export interface Deal {
  orgId: string;
  title: string;
  value: number;
}

const basicSchema = new Schema<Deal>({
  orgId: { type: String, required: true },
  title: { type: String, required: true },
  value: { type: Number, required: true },
});

const dealModel = model<Deal>('deals', basicSchema);

export default dealModel;
