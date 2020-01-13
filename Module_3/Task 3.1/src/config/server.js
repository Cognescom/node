import express from 'express';
const server = express();
const router = express.Router();

server.use(express.json());
server.use('/', router);
import setUserRoutes from '../routes/userRoutes';
import setGroupRoutes from './../routes/groupRoutes';
setUserRoutes(router);
setGroupRoutes(router);


export default server;
