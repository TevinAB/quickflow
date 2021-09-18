import { model, Schema } from 'mongoose';

export interface Profile {
  orgId: string;
  firstName: string;
  lastName: string;
  email: string;
  alias: string;
  role: string;
  roleId: Schema.Types.ObjectId;
}

const basicSchema = new Schema<Profile>({
  orgId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  alias: { type: String, required: true },
  role: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, required: true },
});

const profileModel = model<Profile>('profiles', basicSchema);

export default profileModel;
