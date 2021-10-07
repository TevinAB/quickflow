import getFormData from './responses/getFormData.json';
import editFormData from './responses/editFormData.json';
import listData from './responses/getListsData.json';
import { validateRequest } from '../utils';
import { rest } from 'msw';

export const formDataHanlders = [
  rest.get(
    '/api/resource/customization/form/:type',
    (request, response, ctx) => {
      const valid = validateRequest(request, {
        headers: ['x-auth-token'],
        pathParams: ['type'],
      });

      if (valid) {
        return response(ctx.status(200), ctx.json(getFormData));
      } else {
        return response(ctx.status(400));
      }
    }
  ),
  rest.put('/api/resource/customization/form/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: ['x-auth-token', 'content-type'],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(editFormData));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.get('/api/resource/customization/lists', (request, response, ctx) => {
    const valid = validateRequest(request, { headers: ['x-auth-token'] });

    if (valid) {
      return response(ctx.status(200), ctx.json(listData));
    } else {
      return response(ctx.status(400));
    }
  }),
];
