import { model, Schema } from 'mongoose';

interface Account {
  orgId: string;
  company: string;
}

const basicSchema = new Schema<Account>({
  orgId: { type: String, required: true },
  company: { type: String, required: true },
});

const accountModel = model<Account>('accounts', basicSchema);

export default accountModel;
