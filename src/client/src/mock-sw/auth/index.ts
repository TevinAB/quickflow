import { rest } from 'msw';
import { validateRequest } from '../utils';

export const authHandlers = [
  rest.post('/api/auth/login', (request, response, ctx) => {
    const valid = validateRequest(request, { headers: ['content-type'] });

    if (valid) {
      return response(
        ctx.status(200),
        ctx.json({
          token: 'token',
        })
      );
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.post('/api/auth/sign_up', (request, response, ctx) => {
    const valid = validateRequest(request, { headers: ['content-type'] });

    if (valid) {
      return response(
        ctx.status(200),
        ctx.json({
          token: 'token',
        })
      );
    }
  }),
];
