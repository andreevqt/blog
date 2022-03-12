'use strict';

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const definition = require('../openapi');

const specs = swaggerJsdoc({
  definition,
  apis: ['./src/**/*.route.js']
});

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};
