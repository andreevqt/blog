'use strict';

module.exports.up = (knex) => {
  return knex.schema
    .createTable('comments', (table) => {
      table.increments('id');
      table.text('content');
      table.string('commentableType');
      table.integer('commentableId').unsigned();
      table.integer('authorId').unsigned();
      table.foreign(`authorId`).references(`users.id`).onDelete(`CASCADE`);
      table.timestamps(false, true);
    });
};

module.exports.down = (knex) => {
  return knex.schema
    .dropTable('comments');
};
