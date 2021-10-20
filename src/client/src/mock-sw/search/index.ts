import searchContacts from './responses/searchContacts.json';
import searchProfiles from './responses/searchProfiles.json';
import { validateRequest } from '../utils';
import { AUTH_HEADER } from '../../constants';
import { rest } from 'msw';

export const searchHandlers = [
  rest.get('/api/resource/search/documents/:type', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER],
      searchParams: ['q'],
      pathParams: ['type'],
    });

    if (valid) {
      return response(
        ctx.status(200),
        ctx.json(searchContacts),
        ctx.delay(500)
      );
    } else {
      return response(ctx.status(400));
    }
  }),

  rest.get('/api/resource/search/profiles', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER],
      searchParams: ['q'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(searchProfiles));
    } else {
      return response(ctx.status(400));
    }
  }),
];
