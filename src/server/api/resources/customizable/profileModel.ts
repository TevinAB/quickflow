import { model, Types, Schema } from 'mongoose';
import { NotificationType } from '../../../types';

export interface Profile {
  org_name?: string;
  org_id: Schema.Types.ObjectId;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  role_id: Schema.Types.ObjectId;
  password_hash?: string;
  ceo: boolean;
  notifications: [
    {
      title: string;
      added: Schema.Types.Date;
      read: boolean;
      type: NotificationType;
    }
  ];
  __type: string;
}

const basicSchema = new Schema<Profile>(
  {
    org_name: { type: String, required: false },
    org_id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
    name: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    role_id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
    password_hash: { type: String, required: false },
    ceo: { type: Boolean, default: false },
    notifications: [],
    __type: {
      type: String,
      default: String.bind({}, 'Profile'),
      required: false,
    },
  },
  { autoIndex: true }
);

basicSchema.index({ first_name: 'text' });

const profileModel = model<Profile>('profile', basicSchema);

export default profileModel;
