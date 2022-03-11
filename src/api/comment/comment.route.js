'ust strict';

const { Router } = require('express');
const controller = require('./comment.controller');
const createAuthorize = require('../user/middleware/authorize');
const userService = require('../user/user.service');
const jwtService = require('../user/jwt/jwt.service');
const isCommentsAuthor = require('./middleware/is-comments-author');
const validator = require('./comment.validator');
const { validate } = require('../../core/middleware');

const authorize = createAuthorize(userService, jwtService);

const router = new Router();

module.exports = (app) => {
  app.use('/comments', router);

  router.param('commentId', controller.checkComment);

  router
    .route('/')
    .get(controller.list);

  router
    .route('/:commentId')
    .get(controller.get)
    .put(authorize, isCommentsAuthor, validate(validator.update), controller.update)
    .delete(authorize, isCommentsAuthor, controller.delete);
};
