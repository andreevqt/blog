'ust strict';

const { Router } = require('express');
const controller = require('./comment.controller');
const isCommentsAuthor = require('./middleware/is-comments-author');
const validator = require('./comment.validator');
const { validate } = require('../../core/middleware');
const { authorize } = require('../user/helpers');

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
