import { TimelineBody } from './../../../types';
import { model, Schema } from 'mongoose';

export interface TimelineItem {
  title: string;
  body: TimelineBody;
  itemType: string;
  date: Schema.Types.Date;
}

const timelineItemSchema = new Schema<TimelineItem>(
  {
    title: { type: String, required: true },
    itemType: { type: String, required: true },
    date: { type: Schema.Types.Date, default: Date.now },
  },
  { strict: false }
);

export interface Timeline {
  orgId: Schema.Types.ObjectId;
  parentId: Schema.Types.ObjectId;
  timelineItems: Array<TimelineItem>;
}

const timelineSchema = new Schema<Timeline>({
  orgId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  parentId: { type: Schema.Types.ObjectId, required: true },
  timelineItems: [timelineItemSchema],
});

export const timelineModel = model('timeline', timelineSchema);
