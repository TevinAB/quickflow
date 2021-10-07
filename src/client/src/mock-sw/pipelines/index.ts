import getAllPipelines from './responses/getAllPipeline.json';
import getPipeline from './responses/getPipeline.json';
import addPipeline from './responses/addPipeline.json';
import editPipeline from './responses/editPipeline.json';
import { rest } from 'msw';
import { validateRequest } from '../utils';
import { AUTH_HEADER } from '../../constants';

export const pipelineHandlers = [
  rest.get(
    '/api/resource/customization/pipelines',
    (request, response, ctx) => {
      const valid = validateRequest(request, { headers: [AUTH_HEADER] });

      if (valid) {
        return response(ctx.status(200), ctx.json(getAllPipelines));
      } else {
        return response(ctx.status(400));
      }
    }
  ),
  rest.get(
    '/api/resource/customization/pipeline/:id',
    (request, response, ctx) => {
      const valid = validateRequest(request, {
        headers: [AUTH_HEADER],
        pathParams: ['id'],
      });

      if (valid) {
        return response(ctx.status(200), ctx.json(getPipeline));
      } else {
        return response(ctx.json(400));
      }
    }
  ),
  rest.post(
    '/api/resource/customization/pipeline',
    (request, response, ctx) => {
      const valid = validateRequest(request, {
        headers: [AUTH_HEADER, 'content-type'],
      });

      if (valid) {
        return response(ctx.status(200), ctx.json(addPipeline));
      } else {
        return response(ctx.status(400));
      }
    }
  ),
  rest.put(
    '/api/resource/customization/pipeline/:id',
    (request, response, ctx) => {
      const valid = validateRequest(request, {
        headers: [AUTH_HEADER, 'content-type'],
        pathParams: ['id'],
      });

      if (valid) {
        return response(ctx.status(200), ctx.json(editPipeline));
      } else {
        return response(ctx.status(400));
      }
    }
  ),
  rest.delete(
    '/api/resource/customization/pipeline',
    (request, response, ctx) => {
      const valid = validateRequest(request, { headers: [AUTH_HEADER] });

      if (valid) {
        return response(
          ctx.json(200),
          ctx.json({ result: 'Pipeline deleted' })
        );
      } else {
        return response(ctx.json(400));
      }
    }
  ),
];
