import express from 'express';
import helmet from 'helmet';

const server = express();

server.use(express.json());
server.use(helmet());

export default server;
