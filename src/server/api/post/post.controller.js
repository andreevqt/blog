'use strict';

const asyncHandler = require('express-async-handler');
const { Http } = require('../../constants');
const service = require('./post.service');
const { validateId } = require('../../utils')

module.exports = {
  checkPost: asyncHandler(async (req, res, next, id) => {
    if (!validateId(id)) {
      return res.status(Http.BAD_REQUEST).json({ success: false, message: 'Id should be a number' });
    }

    const post = await service.get(id);
    if (!post) {
      return res.status(Http.NOT_FOUND).json({ success: false, message: 'Post not found' });
    }

    res.locals.post = post;
    next();
  }),

  list: asyncHandler(async (req, res) => {
    const { page, perPage } = req.query;
    const result = await service.list(page, perPage);
    res.status(Http.OK).json(result);
  }),

  create: asyncHandler(async (req, res) => {
    const { currentUser } = res.locals;
    const attrs = req.body;
    const post = await service.create({
      ...attrs,
      authorId: currentUser.id
    });
    res.status(Http.CREATED).json({ success: true, post });
  }),

  update: asyncHandler(async (req, res) => {
    const { post } = res.locals;
    const attrs = req.body;
    const updated = await service.update(post.id, attrs);
    res.status(Http.OK).json({ success: true, post: updated });
  }),

  delete: asyncHandler(async (req, res) => {
    const { post } = res.locals;
    await service.delete(post.id);
    res.status(Http.OK).json({ success: true, message: 'Deleted' });
  })
};
