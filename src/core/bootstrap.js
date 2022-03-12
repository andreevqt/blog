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

module.exports = async (app) => {
  // init db
  const knex = await connectToDb();
  Model.knex(knex);

  // express
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));

  // docs
  swagger(app);

  app.use(logRequests);

  app.use(config.get('app.prefix'), api);

  app.use(express.static(path.resolve(__dirname, '../public')))
  app.use((req, res) => res.status(Http.NOT_FOUND).send('Not found'));
  app.use(errorHandler);
};
