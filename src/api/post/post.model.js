'use strict';

const Model = require('../../core/model');

class Post extends Model {
  static get tableName() {
    return 'posts';
  }

  static get relationMappings() {
    const User = require('../user/user.model');

    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'posts.authorId',
          to: 'users.id'
        }
      }
    };
  }

  static get modifiers() {
    return {
      defaultSelect: (query) => query
        .withGraphFetched('author')
    };
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      author: this.author,
      createdAt: this.created_at,
      updatedAt: this.created_at
    };
  }
}

module.exports = Post;
