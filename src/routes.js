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
import CreatePaymentIntentController from './app/controllers/Striper/CreatePaymentIntentController';

const routes = new Router();

const uploads = multer(multerConfig)

routes.post('/session', SessionController.store)
routes.post('/users', UserController.store);

routes.use(authMiddleware);
routes.post('/products', uploads.single('file'), ProductController.store);
routes.put('/products/:id', uploads.single('file'), ProductController.update);
routes.get('/products', ProductController.index);

routes.post('/categories',uploads.single('file'),CategoryController.store);
routes.get('/categories', CategoryController.index);
routes.put('/categories/:id', uploads.single('file'), CategoryController.update);

routes.post('/orders',OrderController.store);
routes.get('/orders',OrderController.index);
routes.put('/orders/:id', OrderController.update);


// rota de pagamento stripe
routes.post('/create-payment-intent',CreatePaymentIntentController.store)


export default routes;
// module.exports = routes
