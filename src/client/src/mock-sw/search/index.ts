import searchContacts from './responses/searchContacts.json';
import { rest } from 'msw';

export const searchHandlers = [
  rest.get('/', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(searchContacts));
  }),
];
