// import express from "express";
// const express = require('express')
// const routes = require('./routes')
import express from 'express';
import routes from './routes';
import './databse';
// eslint-disable-next-line import/order
import { resolve } from 'node:path';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use('/product-file',express.static(resolve(__dirname,'..','uploads')))
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
// module.exports = new App().app
