'use strict';

const { Http } = require('../../../constants')
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res, next) => {
  const { currentUser, post } = res.locals;
  if (currentUser.id !== post.author.id) {
    return res.status(Http.FORBIDDEN).json({
      success: false,
      message: 'The post doesn\'t belong to you'
    });
  }
  next();
});
