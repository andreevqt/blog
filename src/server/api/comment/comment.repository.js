'use strict';

const Comment = require('./comment.model');

module.exports.list = (page, perPage) => {
  return Comment.query().modifiers('defaultSelect').page(page, perPage);
};

module.exports.get = (id) => {
  return Comment.query().modifiers('defaultSelect').findById(id);
};

module.exports.update = (id, attrs) => {
  return Comment.query().modifiers('defaultSelect').patchAndFetchById(id, attrs);
}

module.exports.delete = (id) => {
  return Comment.query().findById(id).del();
};
