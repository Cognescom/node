import express from 'express';
const server = express();
const router = express.Router();

server.use(express.json());
server.use('/', router);
import setRoutes from './../routes/routes';
setRoutes(router);

export default server;
