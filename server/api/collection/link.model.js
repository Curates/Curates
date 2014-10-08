'use strict';

var knex = require('../../config/db');
var bookshelf = require('bookshelf')(knex);
var Collection = require('./collection.model');

var Link = bookshelf.Model.extend({
  table: 'collections',
  collection: function() {
    return this.belongs(Collection);
  }
});

module.exports = Link;