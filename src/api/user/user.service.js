'use strict';

const { UniqueViolationError } = require('objection');
const repository = require('./user.repository');
const jwt = require('./jwt/jwt.service');
const { Http } = require('../../constants');
const crypto = require('../../core/crypto');

module.exports.get = (id) => {
  return repository.get(id);
};

module.exports.list = (page, perPage) => {
  return repository.list(page, perPage);
};

module.exports.create = async (attrs) => {
  const { email } = attrs;
  const user = await repository.create(attrs);
  const tokens = await jwt.generateTokens(email, user.getData());
  return { ...user.toJSON(), tokens };
};

module.exports.update = (id, attrs) => {
  return repository.update(id, attrs);
};

module.exports.logout = (token) => {
  return jwt.drop(undefined, token);
}

// if it throws then forbidden
module.exports.refresh = async (token) => {
  const { id } = jwt.verify(token);

  const isExists = await jwt.getByToken(token);
  if (!isExists) {
    return;
  }

  const user = await repository.get(id);
  if (!user) {
    return;
  }

  await jwt.drop(user.email);

  return jwt.generateTokens(user.email, user.getData());
};

module.exports.checkPassword = (user, password) => {
  return crypto.compare(password, user.password);
};

module.exports.login = async (email, password) => {
  const user = await repository.getByEmail(email);
  if (!user) {
    return;
  }

  if (!this.checkPassword(user, password)) {
    return;
  }

  // drop all tokens
  await jwt.drop(email);

  const tokens = await jwt.generateTokens(email, user.getData());
  return { ...user.toJSON(), tokens };
};

module.exports.checkDuplicateEmail = (err, req, res, next) => {
  if (err instanceof UniqueViolationError) {
    return res.status(Http.CONFLICT).json({ success: false, message: 'Email already exists' });
  }

  next(err);
};

module.exports.delete = (id) => {
  return repository.delete(id);
};
