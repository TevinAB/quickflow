import { model, Schema } from 'mongoose';

export interface Task {
  orgId: string;
  subject: string;
}

const basicSchema = new Schema<Task>({
  orgId: { type: String, required: true },
  subject: { type: String, required: true },
});

const taskModel = model<Task>('tasks', basicSchema);

export default taskModel;
