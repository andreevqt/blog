'use strict';

const { Http } = require('../../../constants')
const asyncHandler = require('express-async-handler');

module.exports = (userService, jwtService) => asyncHandler(async (req, res, next) => {
  const header = req.headers['authorization'] || '';
  const authorization = header.replace('Bearer ', '');
  if (!authorization) {
    return res.status(Http.UNAUTHROIZED).json({ success: false, message: 'Not authorzied' });
  }

  try {
    const { id } = jwtService.verify(authorization);
    const user = await userService.get(id);
    if (!user) {
      return res.status(Http.UNAUTHROIZED).json({ success: false, message: 'Not authorzied' });
    }

    res.locals.currentUser = user;
    next();
  } catch (err) {
    res.status(Http.FORBIDDEN).json({ success: false, message: 'Forbidden' });
  }
});
