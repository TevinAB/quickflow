import {
  wrapperGetTimeLine,
  addTimelineItem,
  wrapperEditTimelineItem,
} from './controllers';
import { Router } from 'express';
import { timelineModel } from './model';

const timelineRoutes = Router();

timelineRoutes.get('/:_id', wrapperGetTimeLine(timelineModel));
timelineRoutes.post('/:_id', addTimelineItem);
timelineRoutes.put('/:_id', wrapperEditTimelineItem(timelineModel));

export default timelineRoutes;
