import { model, Schema } from 'mongoose';

const COLLECTION_NAME = 'activities';

interface Event {
  calender_id: string;
}

const eventSchema = new Schema<Event>(
  {
    calender_id: { type: String },
  },
  { strict: false, collection: COLLECTION_NAME }
);

interface Task {
  completed: boolean;
}

const taskSchema = new Schema<Task>(
  {
    completed: { type: Boolean, required: true },
  },
  { strict: false, collection: COLLECTION_NAME }
);

export interface Activity {
  org_id: Schema.Types.ObjectId;
  name: string;
  description: string;
  start_date: Schema.Types.Date;
  end_date: Schema.Types.Date;

  //contact, account, or deal ids
  related_to: Array<{
    _id: Schema.Types.ObjectId;
    name: string;
    timeline_id: Schema.Types.ObjectId;
  }>;
  involved: Array<Schema.Types.ObjectId>; //employee ids
}

const activitySchema = new Schema<Activity>(
  {
    org_id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String },
    start_date: { type: Schema.Types.Date },
    end_date: { type: Schema.Types.Date },
    related_to: [],
    involved: [],
  },
  { strict: false, collection: COLLECTION_NAME, discriminatorKey: '__type' }
);

export const activityModel = model('activities', activitySchema);
activityModel.discriminator('Event', eventSchema);
activityModel.discriminator('Task', taskSchema);
