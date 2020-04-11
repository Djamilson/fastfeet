import 'dotenv/config';
import * as Sentry from '@sentry/node';
import cors from 'cors';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import 'express-async-errors';

import http from 'http';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.appExpress = express();
    //this.appExpress.use('/static', express.static('public'));h

    this.server = http.Server(this.appExpress);
    this.corS();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  corS() {
    this.appExpress.use(Sentry.Handlers.requestHandler());
    if (process.env.NODE_ENV === 'development') {
      this.appExpress.use(cors());
    } else {
      this.appExpress.use(
        cors({
          origin: process.env.URL_SITE,
        })
      );
    }
  }

  middlewares() {
    this.appExpress.use(express.json());
    this.appExpress.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'resized'))
    );
  }

  routes() {
    this.appExpress.use(routes);
    this.appExpress.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.appExpress.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        return res.status(500).json(err);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
