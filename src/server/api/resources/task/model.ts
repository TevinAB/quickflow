import { model, Schema } from 'mongoose';

export interface Task {
  orgId: string;
  subject: string;
  description: string;
  due: Schema.Types.Date;
  assignedTo: { firstName: string; lastName: string };
  relatedContact: {
    _id: Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
  };
}

const basicSchema = new Schema<Task>(
  {
    orgId: { type: String, required: true },
    subject: { type: String, required: true },
  },
  { strict: false }
);

const taskModel = model<Task>('task', basicSchema);

export default taskModel;
