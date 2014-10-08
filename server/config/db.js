'use strict';

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'curates_dev'
  }
});

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users', function(t) {
      t.increments('id').primary();
      t.string('first_name', 100);
      t.string('last_name', 100);
      t.string('role', 10).defaultTo('user');
      t.string('email', 100).unique();
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
      t.string('title', 100);
      t.text('description');
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
      t.integer('collection_id')
        .unsigned()
        .references('id')
        .inTable('collections');
      t.string('title', 100);
      t.text('description');
      t.string('url', 255);
    })
    .then(function() {
      console.log('created links table.');
    });
  }
});knex.schema.hasTable('user_collections').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('user_collections', function(t) {
      t.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      t.integer('collection_id')
        .unsigned()
        .references('id')
        .inTable('collections');
    })
    .then(function() {
      console.log('created user_collections table.');
    });
  }
});knex.schema.hasTable('user_favorites').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('user_favorites', function(t) {
      t.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      t.integer('collection_id')
        .unsigned()
        .references('id')
        .inTable('collections');
    })
    .then(function() {
      console.log('created user_favorites table.');
    });
  }
});knex.schema.hasTable('user_votes').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('user_votes', function(t) {
      t.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      t.integer('collection_id')
        .unsigned()
        .references('id')
        .inTable('collections');
    })
    .then(function() {
      console.log('created user_votes table.');
    });
  }
});

module.exports = knex;