'use strict';

module.exports.up = (knex) => {
  return knex.schema
    .createTable('posts', (table) => {
      table.increments('id');
      table.string('title');
      table.text('content');
      table.integer('authorId').unsigned();
      table.foreign(`authorId`).references(`users.id`).onDelete(`CASCADE`);
      table.timestamps(false, true);
    });
};

module.exports.down = (knex) => {
  return knex.schema
    .dropTable('posts');
};
