import { model, Schema } from 'mongoose';

export interface Role {
  orgId: string;
  contact: {
    viewContact: boolean;
    createContact: boolean;
    editContact: boolean;
    deleteContact: boolean;
  };
  account: {
    viewAccount: boolean;
    createAccount: boolean;
    editAccount: boolean;
    deleteAccount: boolean;
  };
  deal: {
    viewDeal: boolean;
    createDeal: boolean;
    editDeal: boolean;
    deleteDeal: boolean;
  };
  task: {
    createTask: boolean;
    editTask: boolean;
    deleteTask: boolean;
  };
  event: {
    createEvent: boolean;
    editEvent: boolean;
    deleteEvent: boolean;
  };
  user: {
    createUser: boolean;
    editUser: boolean;
    deleteUser: boolean;
  };
  email: {
    sendEmail: boolean;
  };
  role: {
    viewRoles: boolean;
    createRoles: boolean;
    editRoles: boolean;
    deleteRoles: boolean;
  };
}

const basicSchema = new Schema<Role>({
  orgId: { type: String, required: true },
  contact: {
    type: {
      viewContact: { type: Boolean, required: true },
      createContact: { type: Boolean, required: true },
      editContact: { type: Boolean, required: true },
      deleteContact: { type: Boolean, required: true },
    },
    required: true,
  },
  account: {
    type: {
      viewAccount: { type: Boolean, required: true },
      createAccount: { type: Boolean, required: true },
      editAccount: { type: Boolean, required: true },
      deleteAccount: { type: Boolean, required: true },
    },
    required: true,
  },
  deal: {
    type: {
      viewDeal: { type: Boolean, required: true },
      createDeal: { type: Boolean, required: true },
      editDeal: { type: Boolean, required: true },
      deleteDeal: { type: Boolean, required: true },
    },
    required: true,
  },
  task: {
    type: {
      createTask: { type: Boolean, required: true },
      editTask: { type: Boolean, required: true },
      deleteTask: { type: Boolean, required: true },
    },
    required: true,
  },
  event: {
    type: {
      createEvent: { type: Boolean, required: true },
      editEvent: { type: Boolean, required: true },
      deleteEvent: { type: Boolean, required: true },
    },
    required: true,
  },
  user: {
    type: {
      createUser: { type: Boolean, required: true },
      editUser: { type: Boolean, required: true },
      deleteUser: { type: Boolean, required: true },
    },
    required: true,
  },
  email: {
    type: {
      sendEmail: { type: Boolean, required: true },
    },
    required: true,
  },
  role: {
    type: {
      viewRoles: { type: Boolean, required: true },
      createRoles: { type: Boolean, required: true },
      editRoles: { type: Boolean, required: true },
      deleteRoles: { type: Boolean, required: true },
    },
    required: true,
  },
});

const roleModel = model<Role>('roles', basicSchema);

export default roleModel;
