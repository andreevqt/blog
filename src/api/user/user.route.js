'use strict';

const { Router } = require('express');
const controller = require('./user.controller');
const validator = require('./user.validator');
const { validate } = require('../../core/middleware');
const createAuthorize = require('./middleware/authorize');
const userService = require('./user.service');
const jwtService = require('./jwt/jwt.service');
const isCurrentUser = require('./middleware/is-current-user');

const authorize = createAuthorize(userService, jwtService);

const router = new Router();

module.exports = (app) => {
  app.use('/users', router);

  router.param('userId', controller.checkUser);

  router
    .route('/')
    .get(authorize, controller.getByAccess)
    .post(validate(validator.create), controller.create);

  router
    .route('/token')
    .post(validate(validator.token), controller.token);

  router
    .route('/login')
    .post(validate(validator.login), controller.login);

  router
    .route('/logout')
    .post(validate(validator.logout), controller.logout);

  router
    .route('/:userId')
    .get(controller.get)
    .put(authorize, isCurrentUser, validate(validator.update), controller.update);
};
