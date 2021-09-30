import { model, Types, Schema } from 'mongoose';
import { NotificationType } from '../../../types';

export interface Profile {
  orgName?: string;
  orgId: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  roleId: Schema.Types.ObjectId;
  passwordHash?: string;
  ceo: boolean;
  notifications: [
    {
      title: string;
      added: Schema.Types.Date;
      read: boolean;
      type: NotificationType;
    }
  ];
}

const basicSchema = new Schema<Profile>({
  orgName: { type: String, required: false },
  orgId: { type: Schema.Types.ObjectId, default: Types.ObjectId },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, default: Types.ObjectId },
  passwordHash: { type: String, required: false },
  ceo: { type: Boolean, default: false },
  notifications: [],
});

const profileModel = model<Profile>('profile', basicSchema);

export default profileModel;
