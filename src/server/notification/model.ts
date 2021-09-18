import { Date, model, Schema } from 'mongoose';

export interface Notification {
  orgId: string;
  title: string;
  date: Date;
}

const basicSchema = new Schema<Notification>({
  orgId: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Schema.Types.Date, default: Date.now },
});

const notificationModel = model<Notification>('notifications', basicSchema);

export default notificationModel;
