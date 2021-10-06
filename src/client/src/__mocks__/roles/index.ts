import getAllRoles from './responses/getAllRoles.json';
import getRole from './responses/getRole.json';
import addRole from './responses/addRole.json';
import editRole from './responses/editRole.json';
import deleteRole from './responses/deleteRole.json';
import { rest } from 'msw';

export const roleHandlers = [
  rest.get('/api/resource/customization/roles', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(getAllRoles));
  }),
  rest.get('/api/resource/customization/role/:id', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(getRole));
  }),
  rest.post('/api/resource/customization/role', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(addRole));
  }),
  rest.put('/api/resource/customization/role/:id', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(editRole));
  }),
  rest.delete(
    '/api/resource/customization/role/:id',
    (request, response, ctx) => {
      return response(ctx.status(200), ctx.json(deleteRole));
    }
  ),
];
