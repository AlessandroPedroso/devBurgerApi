// const {Router} = require('express')
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './middlewares/auth';

const routes = new Router();


routes.post('/session', SessionController.store)
routes.use(authMiddleware);

routes.post('/users', UserController.store);



export default routes;
// module.exports = routes
