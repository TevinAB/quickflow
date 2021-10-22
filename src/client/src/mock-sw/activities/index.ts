import getEvent from './responses/getEvent.json';
import addEvent from './responses/addEvent.json';
import deleteEvent from './responses/deleteEvent.json';
import getTasks from './responses/getTasks.json';
import { validateRequest } from '../utils';
import { AUTH_HEADER } from '../../constants';
import { rest } from 'msw';

export const activityRouteHandlers = [
  rest.get('/api/resource/activity/:type', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER],
      searchParams: ['from', 'to'],
      pathParams: ['type'],
    });

    if (valid) {
      const { type } = request.params;

      if (type === 'events')
        return response(ctx.status(200), ctx.json(getEvent), ctx.delay(1200));

      if (type === 'tasks')
        return response(ctx.status(200), ctx.json(getTasks), ctx.delay(1200));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.post('/api/resource/activity/event', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(addEvent));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.put('/api/resource/activity/event/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
      pathParams: ['id'],
    });

    if (valid) {
      //reuse addEvent response
      return response(ctx.status(200), ctx.json(addEvent));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.delete('/api/resource/activity/event/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(deleteEvent));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.put(
    '/api/resource/activity/task/completed/:id',
    (request, response, ctx) => {
      const valid = validateRequest(request, {
        headers: [AUTH_HEADER, 'content-type'],
        pathParams: ['id'],
      });

      if (valid) {
        return response(ctx.status(200));
      } else {
        return response(ctx.status(400));
      }
    }
  ),
];
