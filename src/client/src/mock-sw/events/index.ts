import getEvent from './responses/getEvent.json';
import addEvent from './responses/addEvent.json';
import deleteEvent from './responses/deleteEvent.json';
import { validateRequest } from '../utils';
import { rest } from 'msw';

export const eventRouteHandlers = [
  rest.get('/api/resource/activity/:events', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: ['x-auth-token'],
      searchParams: ['from', 'to'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(getEvent));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.post('/api/resource/activity/event', (request, response, ctx) => {
    const valid = validateRequest(request, { headers: ['x-auth-token'] });

    if (valid) {
      return response(ctx.status(200), ctx.json(addEvent));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.put('/api/resource/activity/event/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: ['x-auth-token'],
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
      headers: ['x-auth-token'],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(deleteEvent));
    } else {
      return response(ctx.status(400));
    }
  }),
];