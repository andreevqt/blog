'use strict';

const repository = require('./post.repository');

module.exports.get = (id) => {
  return repository.get(id);
};

module.exports.list = (page, perPage) => {
  return repository.list(page, perPage);
};

module.exports.create = (attrs) => {
  return repository.create(attrs);
};

module.exports.bulkCreate = (items) => {
  return repository.bulkCreate(items);
};

module.exports.update = (id, attrs) => {
  return repository.update(id, attrs);
};

module.exports.delete = (id) => {
  return repository.delete(id);
};
