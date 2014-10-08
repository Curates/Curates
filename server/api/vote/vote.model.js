'use strict';

var knex = require('../../config/db');
var bookshelf = require('bookshelf')(knex);

var Vote = bookshelf.Model.extend({
  table: 'user_votes',
});

module.exports = Vote;