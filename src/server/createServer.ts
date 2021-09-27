import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import apiRoutes from './api';
import RequestException from './types/exceptions/requestException';

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api', apiRoutes);

server.use(function (
  error: RequestException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error.statusCode) {
    response.status(error.statusCode).json({ message: error.message });
  } else {
    response.status(400).json({ message: (error as Error).message });
  }
});
export default server;
