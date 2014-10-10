'use strict';

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'curates',
  }
});

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users', function(t) {
      t.increments('id').primary();
      t.string('first_name', 100).notNullable();
      t.string('last_name', 100).notNullable();
      t.string('role', 10).defaultTo('user').notNullable();
      t.string('email', 100).unique().notNullable();
      t.string('provider', 25).defaultTo('local').notNullable();
      t.string('password', 255);
      t.text('salt');
      t.timestamps();
    })
    .then(function() {
      console.log('created users table.');
    });
  }
});

knex.schema.hasTable('collections').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('collections', function(t) {
      t.increments('id').primary();
      t.string('title', 255);
      t.string('description', 255).defaultTo('');
      t.integer('votes').defaultTo(0);
      t.integer('following').defaultTo(0);
      t.integer('user_id');
    })
    .then(function() {
      console.log('created collections table.');
    });
  }
});

knex.schema.hasTable('links').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('links', function(t) {
      t.increments('id').primary();
      t.integer('collection_id');
      t.string('title', 100).notNullable();
      t.text('description').defaultTo('');
      t.string('url', 255);
    })
    .then(function() {
      console.log('created links table.');
    });
  }
});

knex.schema.hasTable('favorites').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('favorites', function(t) {
      t.increments('id').primary();
      t.integer('user_id');
      t.integer('collection_id');
    })
    .then(function() {
      console.log('created favorites table.');
    });
  }
});

knex.schema.hasTable('votes').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('votes', function(t) {
      t.increments('id').primary();
      t.integer('user_id');
      t.integer('collection_id');
    })
    .then(function() {
      console.log('created votes table.');
    });
  }
});

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('virtuals');
bookshelf.plugin('registry');

module.exports = bookshelf;