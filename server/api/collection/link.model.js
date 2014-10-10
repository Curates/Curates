'use strict';

var bookshelf = require('../../config/db');
require('../collection/collection.model');

var Link = bookshelf.Model.extend({
  tableName: 'links',
  collection: function() {
    return this.belongsTo('Collection');
  }
});

module.exports = bookshelf.model('Link', Link);