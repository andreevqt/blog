'use strict';

const express = require('express');
const _ = require('lodash');
const { Model } = require('objection');
const path = require('path');
const { Http } = require('../constants');
const { logRequests, errorHandler } = require('../core/middleware');
const config = require('../config');
const connectToDb = require('./database');
const api = require('../api');
const swagger = require('./swagger');
const cors = require('cors');

module.exports = async (app) => {
  // init db
  const knex = await connectToDb();
  Model.knex(knex);
  // express
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));
  app.use(cors());
  // serve static file
  app.use(express.static(`${process.cwd()}/dist`));
  // docs
  swagger(app);
  // log requests
  app.use(logRequests);
  // front
  app.route('/', (req, res) => res.sendFile(`${process.cwd()}/dist/index.html`));
  // api routes
  app.use(config.get('app.prefix'), api);
  // fallback to spa app
  app.use((req, res, next) => res.status(Http.NOT_FOUND).send('Not found'));
  app.use(errorHandler);
};
