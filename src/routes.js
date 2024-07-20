// const {Router} = require('express')
import { Router } from 'express';

import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import ProductController from './app/controllers/ProductController';
import CategoryController from './app/controllers/CategoryController';
import OrderController from './app/controllers/OrderController';

const routes = new Router();

const uploads = multer(multerConfig)

routes.post('/session', SessionController.store)

routes.use(authMiddleware);
routes.post('/users', UserController.store);

routes.post('/products', uploads.single('file'), ProductController.store);
routes.get('/products', ProductController.index);

routes.post('/categories',CategoryController.store);
routes.get('/categories', CategoryController.index);

routes.post('/orders',OrderController.store);


export default routes;
// module.exports = routes
