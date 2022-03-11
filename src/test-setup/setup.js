'use strict';

const express = require('express');
const { Model } = require('objection');
const initKnex = require('../core/database');
const router = require('../api');
const Migrator = require('../core/migrators/migrator');

const migrator = new Migrator();

module.exports = async () => {
  const app = express();

  app.use(express.json());
  app.use('/', router);

  const knex = await initKnex();
  Model.knex(knex);

  await migrator.init(knex);
  await migrator.migrate();

  return {
    app,
    destroy: () => knex.destroy()
  };
};
