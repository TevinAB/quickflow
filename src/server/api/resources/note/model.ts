import { model, Schema } from 'mongoose';

export interface Note {
  orgId: string;
  body: string;
}

const basicSchema = new Schema<Note>(
  {
    orgId: { type: String, required: true },
    body: { type: String, required: true },
  },
  { strict: false }
);

const noteModel = model<Note>('note', basicSchema);

export default noteModel;
