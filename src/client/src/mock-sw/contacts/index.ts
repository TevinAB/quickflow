import getAllContacts from './responses/getContacts.json';
import getContact from './responses/getContact.json';
import addContact from './responses/addContact.json';
import editContact from './responses/editContact.json';
import deleteContact from './responses/deleteContact.json';
import { validateRequest } from '../utils';
import { AUTH_HEADER } from '../../constants';
import { rest } from 'msw';

export const contactHandlers = [
  rest.get('/api/resource/document/contacts', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER],
      searchParams: ['pageNum', 'itemsPerPage'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(getAllContacts));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.get('/api/resource/document/contact/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(getContact));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.post('/api/resource/document/contact', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
    });
    if (valid) {
      return response(ctx.status(200), ctx.json(addContact));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.put('/api/resource/document/contact/:id', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
      pathParams: ['id'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(editContact));
    } else {
      return response(ctx.status(400));
    }
  }),
  rest.delete('/api/resource/document/contact', (request, response, ctx) => {
    const valid = validateRequest(request, {
      headers: [AUTH_HEADER, 'content-type'],
    });

    if (valid) {
      return response(ctx.status(200), ctx.json(deleteContact));
    } else {
      return response(ctx.status(400));
    }
  }),
];
