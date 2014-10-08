'use strict';

var knex = require('../../config/db');
var bookshelf = require('bookshelf')(knex);
var Collection = require('../collection/collection.model');

var Link = bookshelf.Model.extend({
  table: 'links',
  collection: function() {
    return this.belongs(Collection);
  }
});

module.exports = Link;