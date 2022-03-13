'use strict';

const User = require('./user.model');

module.exports.get = (id) => {
  return User.query().modify('defaultSelect').findById(id);
};

module.exports.getByEmail = (email) => {
  return User.query().modify('defaultSelect').where({ email }).first();
};

module.exports.list = (page, perPage) => {
  return User.query().modify('defaultSelect').page(page, perPage);
};

module.exports.create = async (attrs) => {
  const user = await User.query().insert(attrs);
  return user.$query().modify('defaultSelect');
};

module.exports.update = (id, attrs) => {
  return User.query().patchAndFetchById(id, attrs);
};

module.exports.delete = (id) => {
  return User.query().deleteById(id);
};
