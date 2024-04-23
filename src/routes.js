// const {Router} = require('express')
import { Router } from 'express';

import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './middlewares/auth';
import ProductController from './app/controllers/ProductController';

const routes = new Router();

const uploads = multer(multerConfig)

routes.post('/session', SessionController.store)
routes.use(authMiddleware);
routes.post('/users', UserController.store);
routes.post('/products', uploads.single('file'), ProductController.store)

export default routes;
// module.exports = routes
