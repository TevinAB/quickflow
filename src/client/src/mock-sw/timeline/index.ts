import getTimeline from './response/getTimeline.json';
import addTimelineItem from './response/addTimelineItem.json';
import { validateRequest } from '../utils';
import { AUTH_HEADER } from '../../constants';
import { rest } from 'msw';

export const timelineHandlers = [
  rest.get('/api/resource/timeline/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(getTimeline));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.post('/api/resource/timeline/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(addTimelineItem));
    } else {
      return response(ctx.json(400));
    }
  }),
  rest.put('/api/resource/timeline/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
      pathParams: ['id'],
    });

    if (valid) {
      //reuse the addTimelineItem mock response
      return response(ctx.status(200), ctx.json(addTimelineItem));
    } else {
      return response(ctx.status(400));
    }
  }),
];
