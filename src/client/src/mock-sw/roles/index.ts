import getAllRoles from './responses/getAllRoles.json';
import getRole from './responses/getRole.json';
import addRole from './responses/addRole.json';
import editRole from './responses/editRole.json';
import deleteRole from './responses/deleteRole.json';
import { validateRequest } from '../utils';
import { AUTH_HEADER } from '../../constants';
import { rest } from 'msw';

export const roleHandlers = [
  rest.get('/api/resource/customization/roles', (request, response, ctx) => {
    const valid = validateRequest(request, { headers: [AUTH_HEADER] });

    if (valid) {
      return response(ctx.status(200), ctx.json(getAllRoles));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.get('/api/resource/customization/role/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(getRole));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.post('/api/resource/customization/role', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(addRole));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.put('/api/resource/customization/role/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(editRole));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.delete(
    '/api/resource/customization/role/:id',
    (request, response, ctx) => {
      const valid = validateRequest(request, {
        headers: [AUTH_HEADER],
        pathParams: ['id'],
      });

      if (valid) {
        return response(ctx.status(200), ctx.json(deleteRole));
      } else {
        return response(ctx.status(400));
      }
    }
  ),
];
