'use strict';

var knex = require('../../config/db');
var bookshelf = require('bookshelf')(knex);
var Collection = require('../collection/collection.model');

var Favorite = bookshelf.Model.extend({
  table: 'user_favorites',
  collection: function() {
    return this.belongs(Collection);
  }
});

module.exports = Favorite;