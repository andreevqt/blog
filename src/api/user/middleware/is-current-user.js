'use strict';

const { Http } = require('../../../constants')
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler((req, res, next) => {
  const { user, currentUser } = res.locals;
  if (currentUser.id !== user.id) {
    return res.status(Http.FORBIDDEN).json({ success: false, message: 'Forbidden' });
  }

  next();
});
