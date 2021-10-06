import getEvent from './responses/getEvent.json';
import addEvent from './responses/addEvent.json';
import deleteEvent from './responses/deleteEvent.json';
import { rest } from 'msw';

export const eventRouteHandlers = [
  rest.get('/api/resource/activity/events', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(getEvent));
  }),
  rest.post('/api/resource/activity/event', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(addEvent));
  }),
  rest.put('/api/resource/activity/event/:id', (request, response, ctx) => {
    //reuse addEvent response
    return response(ctx.status(200), ctx.json(addEvent));
  }),
  rest.delete('/api/resource/activity/event/:id', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(deleteEvent));
  }),
];
