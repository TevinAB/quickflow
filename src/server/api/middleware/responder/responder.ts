import { Request, Response } from 'express';

//MUST be the last middleware on the api route.
export default function responder(request: Request, response: Response) {
  if (typeof request.middlewareInfo.response.token === 'object') {
    delete request.middlewareInfo.response.token;
  }

  if (request.middlewareInfo.response.data) {
    return response
      .status(200)
      .json({
        ...request.middlewareInfo.response.data,
        token: request.middlewareInfo.response.token,
      });
  }

  return response.status(200).json(request.middlewareInfo.response);
}
