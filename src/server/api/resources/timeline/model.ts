import { TimelineBody } from './../../../types';
import { model, Schema } from 'mongoose';

export interface TimelineItem {
  title: string;
  body: TimelineBody;
  item_type: string;
  date: Schema.Types.Date;
}

const timelineItemSchema = new Schema<TimelineItem>(
  {
    title: { type: String, required: true },
    item_type: { type: String, required: true },
    date: { type: Schema.Types.Date, default: Date.now },
  },
  { strict: false }
);

export interface Timeline {
  org_id: Schema.Types.ObjectId;
  parent_id: Schema.Types.ObjectId;
  timeline_items: Array<TimelineItem>;
}

const timelineSchema = new Schema<Timeline>({
  org_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  parent_id: { type: Schema.Types.ObjectId, required: true },
  timeline_items: [timelineItemSchema],
});

export const timelineModel = model('timeline', timelineSchema);
