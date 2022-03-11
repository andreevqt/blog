'use strict';

const { Router } = require('express');
const users = require('./user/user.route');
const comments = require('./comment/comment.route');

const router = new Router();

users(router);
// init comments
comments(router);

module.exports = router;
