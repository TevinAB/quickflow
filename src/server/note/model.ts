import { model, Schema } from 'mongoose';

export interface Note {
  orgId: string;
  subject: string;
}

const basicSchema = new Schema<Note>({
  orgId: { type: String, required: true },
  subject: { type: String, required: true },
});

const noteModel = model<Note>('notes', basicSchema);

export default noteModel;
