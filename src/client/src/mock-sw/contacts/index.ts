import getAllContacts from './responses/getContacts.json';
import getContact from './responses/getContact.json';
import addContact from './responses/addContact.json';
import editContact from './responses/editContact.json';
import deleteContact from './responses/deleteContact.json';
import { rest } from 'msw';

export const contactHandlers = [
  rest.get('/api/resource/document/contacts', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(getAllContacts));
  }),
  rest.get('/api/resource/document/contact/:id', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(getContact));
  }),
  rest.post('/api/resource/document/contact', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(addContact));
  }),
  rest.put('/api/resource/document/contact/:id', (request, response, ctx) => {
    return response(ctx.status(200), ctx.json(editContact));
  }),
  rest.delete(
    '/api/resource/document/contact/:id',
    (request, response, ctx) => {
      return response(ctx.status(200), ctx.json(deleteContact));
    }
  ),
];
