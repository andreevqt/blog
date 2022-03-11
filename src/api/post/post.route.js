'ust strict';

const { Router } = require('express');
const controller = require('./post.controller');
const { authorize } = require('../user/helpers');
const { query, create, update } = require('./post.validator');
const isPostAuthor = require('./middleware/is-post-author');
const validate = require('../../core/middleware/validate');

const router = new Router();

module.exports = (app) => {
  app.use('/posts', router);

  router.param('postId', controller.checkPost);

  router
    .route('/')
    .get(validate(query, 'query'), controller.list)
    .post(authorize, validate(create), controller.create);

  router
    .route('/:postId')
    .put(authorize, isPostAuthor, validate(update), controller.update)
    .delete(authorize, isPostAuthor, validate(update), controller.delete);
};
