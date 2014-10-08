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
      t.string('email', 100).unique();
      t.string('password', 100);
      t.text('salt');
    });
  }
});

knex.schema.hasTable('collections').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('collections', function(t) {
      t.increments('id').primary();
      t.string('first_name', 100);
      t.string('last_name', 100);
      t.string('email', 100).unique();
    });
  }
});
knex.schema.hasTable('links').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('links', function(t) {
      t.increments('id').primary();
      t.string('title', 100);
      t.text('description');
      t.string('url', 255);
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
    });
  }
});

module.exports = knex;