import { model, Schema } from 'mongoose';

export interface Event {
  orgId: string;
  title: string;
  start: Schema.Types.Date;
  end: Schema.Types.Date;
  attendees: [Schema.Types.ObjectId];
}

const basicSchema = new Schema<Event>(
  {
    orgId: { type: String, required: true },
    title: { type: String, required: true },
  },
  { strict: false }
);

const eventModel = model<Event>('event', basicSchema);

export default eventModel;
