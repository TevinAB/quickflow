import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import apiRoutes from './api';
import RequestException from './exceptions/requestException';
import path from 'path';

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api', apiRoutes);

server.use(express.static(path.join(__dirname, '../client/build')));
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

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
