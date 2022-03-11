'use strict';

const userService = require('./user.service');
const jwtService = require('./jwt/jwt.service');
const createAuthorize = require('./middleware/authorize');

module.exports.authorize = createAuthorize(userService, jwtService);
