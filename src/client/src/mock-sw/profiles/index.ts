import getAllProfiles from './responses/getAllProfiles.json';
import getProfile from './responses/getProfile.json';
import addProfile from './responses/addProfile.json';
import editProfile from './responses/editProfile.json';
import deleteProfile from './responses/deleteProfile.json';
import { validateRequest } from '../utils';
import { AUTH_HEADER } from '../../constants';
import { rest } from 'msw';

export const profileHandlers = [
  rest.get('/api/resource/customization/profiles', (request, response, ctx) => {
    const valid = validateRequest(request, { headers: [AUTH_HEADER] });

    if (valid) {
      return response(ctx.status(200), ctx.json(getAllProfiles));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.get(
    '/api/resource/customization/profile/:id',
    (request, response, ctx) => {
      const valid = validateRequest(request, {
        headers: [AUTH_HEADER],
        pathParams: ['id'],
      });

      if (valid) {
        return response(ctx.status(200), ctx.json(getProfile));
      } else {
        return response(ctx.status(400));
      }
    }
  ),
  rest.post('/api/resource/customization/profile', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(addProfile));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.put(
    '/api/resource/customization/profile/:id',
    (request, response, ctx) => {
      const valid = validateRequest(request, {
        headers: [AUTH_HEADER, 'content-type'],
        pathParams: ['id'],
      });

      if (valid) {
        return response(ctx.status(200), ctx.json(editProfile));
      } else {
        return response(ctx.status(400));
      }
    }
  ),
  rest.delete(
    '/api/resource/customization/profile',
    (request, response, ctx) => {
      const valid = validateRequest(request, {
        headers: [AUTH_HEADER, 'content-type'],
      });

      if (valid) {
        return response(ctx.status(200), ctx.json(deleteProfile));
      } else {
        return response(ctx.status(400));
      }
    }
  ),
];
