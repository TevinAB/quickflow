import getAsscDeals from './responses/getAssociatedDeals.json';
import getDeal from './responses/getDeal.json';
import getAllDeals from './responses/getAllDeals.json';
import createDeal from './responses/createDeal.json';
import editDeal from './responses/editDeal.json';
import { validateRequest } from '../utils';
import { AUTH_HEADER } from '../../constants';
import { rest } from 'msw';

export const dealHandlers = [
  rest.get('/api/resource/document/deals', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER],
      searchParams: ['pageNum', 'itemsPerPage'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(getAllDeals));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.get('/api/resource/document/deal/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(getDeal));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.post('/api/resource/document/deal', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(createDeal));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.put('/api/resource/document/deal/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(editDeal));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.delete('/api/resource/document/deal/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
      pathParams: ['id'],
    });

    if (valid) {
      return response(
        ctx.status(200),
        ctx.json({
          message: 'Document deleted.',
        })
      );
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.get(
    '/api/resource/document/deals/assc/:id',
    (request, response, ctx) => {
      const valid = validateRequest(request, {
        headers: [AUTH_HEADER],
        pathParams: ['id'],
      });

      if (valid) {
        return response(ctx.status(200), ctx.json(getAsscDeals));
      } else {
        return response(ctx.status(400));
      }
    }
  ),
];
