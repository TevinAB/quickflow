import { Request, Response } from 'express';

//MUST be the last middleware on the api route.
export default function responder(request: Request, response: Response) {
  response.status(200).json(request.middlewareInfo.response);
}
