import getFormData from './responses/getFormData.json';
import editFormData from './responses/editFormData.json';
import listData from './responses/getListsData.json';
import { validateRequest } from '../utils';
import { AUTH_HEADER } from '../../constants';
import { rest } from 'msw';

export const formDataHanlders = [
  rest.get(
    '/api/resource/customization/form/:type',
    (request, response, ctx) => {
      const valid = validateRequest(request, {
        headers: [AUTH_HEADER],
        pathParams: ['type'],
      });

      if (valid) {
        return response(
          ctx.status(200),
          ctx.json(getFormData),
          ctx.delay(1200)
        );
      } else {
        return response(ctx.status(400));
      }
    }
  ),
  rest.put('/api/resource/customization/form/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(editFormData), ctx.delay(1200));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.get('/api/resource/customization/lists', (request, response, ctx) => {
    const valid = validateRequest(request, { headers: [AUTH_HEADER] });

    if (valid) {
      return response(ctx.status(200), ctx.json(listData), ctx.delay(1200));
    } else {
      return response(ctx.status(400));
    }
  }),
];
