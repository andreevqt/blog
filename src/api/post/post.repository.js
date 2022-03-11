'use strict';

const Post = require('./post.model');

module.exports.get = (id) => {
  return Post.query().modify('defaultSelect').findById(id);
};

module.exports.list = (page, perPage) => {
  return Post.query().modify('defaultSelect').page(page, perPage);
};

module.exports.create = async (attrs) => {
  const post = await Post.query().insert(attrs);
  return post.$query().modify('defaultSelect');
};

module.exports.bulkCreate = async (items) => {
  return Promise.all(items.map((attrs) => this.create(attrs)));
};

module.exports.update = (id, attrs) => {
  return Post.query().patchAndFetchById(id, attrs);
};

module.exports.delete = (id) => {
  return Post.query().deleteById(id);
};

module.exports.bulkDelete = (id) => {
  return Post.query().deleteById(id);
};
