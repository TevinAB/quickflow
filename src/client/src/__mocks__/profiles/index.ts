import getAllProfiles from './responses/getAllProfiles.json';
import getProfile from './responses/getProfile.json';
import addProfile from './responses/addProfile.json';
import editProfile from './responses/editProfile.json';
import deleteProfile from './responses/deleteProfile.json';
import { rest } from 'msw';

export const profileHandlers = [
  rest.get('/api/resource/customization/profiles', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(getAllProfiles));
  }),
  rest.get(
    '/api/resource/customization/profile/:id',
    (request, response, ctx) => {
      return response(ctx.status(200), ctx.json(getProfile));
    }
  ),
  rest.post('/api/resource/customization/profile', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(addProfile));
  }),
  rest.put(
    '/api/resource/customization/profile/:id',
    (request, response, ctx) => {
      return response(ctx.status(200), ctx.json(editProfile));
    }
  ),
  rest.delete(
    '/api/resource/customization/profile/:id',
    (request, response, ctx) => {
      return response(ctx.status(200), ctx.json(deleteProfile));
    }
  ),
];
