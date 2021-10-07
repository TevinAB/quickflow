import getFormData from './responses/getFormData.json';
import editFormData from './responses/editFormData.json';
import listData from './responses/getListsData.json';
import { rest } from 'msw';

export const formDataHanlders = [
  rest.get(
    '/api/resource/customization/form/contact',
    (request, response, ctx) => {
      return response(ctx.status(200), ctx.json(getFormData));
    }
  ),
  rest.get('/api/resource/customization/lists', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(listData));
  }),
  rest.put('/api/resource/customization/form', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(editFormData));
  }),
];
