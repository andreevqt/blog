'use strict';

const { Router } = require('express');
const users = require('./user/user.route');
const comments = require('./comment/comment.route');
const posts = require('./post/post.route');

const router = new Router();

users(router);
comments(router);
posts(router);

module.exports = router;
