import { model, Schema } from 'mongoose';

export interface Event {
  orgId: string;
  title: string;
}

const basicSchema = new Schema<Event>({
  orgId: { type: String, required: true },
  title: { type: String, required: true },
});

const eventModel = model<Event>('events', basicSchema);

export default eventModel;
