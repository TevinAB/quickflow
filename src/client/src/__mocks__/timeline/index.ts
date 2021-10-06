import getTimeline from './response/getTimeline.json';
import addTimelineItem from './response/addTimelineItem.json';
import { rest } from 'msw';

export const timelineHandlers = [
  rest.get('/api/resource/timeline/:id', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(getTimeline));
  }),
  rest.post('/api/resource/timeline/:id', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(addTimelineItem));
  }),
  rest.put('/api/resource/timeline/:id', (request, response, ctx) => {
    //reuse the addTimelineItem mock response
    return response(ctx.status(200), ctx.json(addTimelineItem));
  }),
];
