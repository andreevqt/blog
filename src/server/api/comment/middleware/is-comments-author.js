'use strict';

const { Http } = require('../../../constants')
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res, next) => {
  const { currentUser, comment } = res.locals;
  if (currentUser.id !== comment.author.id) {
    return res.status(Http.FORBIDDEN).json({
      success: false,
      message: 'The comment doesn\'t belong to you'
    });
  }
  next();
});
