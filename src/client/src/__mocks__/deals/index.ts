import getAsscDeals from './responses/getAssociatedDeals.json';
import createDeal from './responses/createDeal.json';
import { rest } from 'msw';

export const dealHandlers = [
  rest.get(
    '/api/resource/document/deals/assc/:id',
    (request, response, ctx) => {
      return response(ctx.status(200), ctx.json(getAsscDeals));
    }
  ),
  rest.post('/api/resource/document/deal', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(createDeal));
  }),
];
