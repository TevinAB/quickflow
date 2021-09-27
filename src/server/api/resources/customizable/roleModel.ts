import { model, Schema } from 'mongoose';

export interface Role {
  orgId: string;
  roleName: string;
  view: {
    contact: boolean;
    account: boolean;
    deal: boolean;
  };
  create: {
    contact: boolean;
    account: boolean;
    deal: boolean;
    event: boolean;
    task: boolean;
    email: boolean;
  };
  edit: {
    contact: boolean;
    account: boolean;
    deal: boolean;
    event: boolean;
    task: boolean;
  };
  delete_: {
    contact: boolean;
    account: boolean;
    deal: boolean;
    event: boolean;
    task: boolean;
  };
  isAdmin: boolean;
}

const basicSchema = new Schema<Role>({
  orgId: { type: String, required: true },
  roleName: { type: String, required: true },
  view: {
    type: {
      contact: { type: Boolean, required: true },
      account: { type: Boolean, required: true },
      deal: { type: Boolean, required: true },
    },
    default: {
      contact: true,
      account: true,
      deal: true,
    },
    required: true,
  },
  create: {
    type: {
      contact: { type: Boolean, required: true },
      account: { type: Boolean, required: true },
      deal: { type: Boolean, required: true },
      event: { type: Boolean, required: true },
      task: { type: Boolean, required: true },
      email: { type: Boolean, required: true },
    },
    default: {
      contact: false,
      account: false,
      deal: false,
      event: false,
      task: false,
      email: false,
    },
    required: true,
  },
  edit: {
    type: {
      account: { type: Boolean, required: true },
      contact: { type: Boolean, required: true },
      deal: { type: Boolean, required: true },
      event: { type: Boolean, required: true },
      task: { type: Boolean, required: true },
    },
    default: {
      contact: false,
      account: false,
      deal: false,
      event: false,
      task: false,
    },
    required: true,
  },
  delete_: {
    type: {
      contact: { type: Boolean, required: true },
      account: { type: Boolean, required: true },
      deal: { type: Boolean, required: true },
      event: { type: Boolean, required: true },
      task: { type: Boolean, required: true },
    },
    default: {
      contact: false,
      account: false,
      deal: false,
      event: false,
      task: false,
    },
    required: true,
  },
  isAdmin: { type: Boolean, required: true, default: false },
});

const roleModel = model<Role>('role', basicSchema);

export default roleModel;
