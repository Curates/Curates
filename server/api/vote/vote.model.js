'use strict';

var bookshelf = require('../../config/db');
var User = require('../user/user.model');
var Collection = require('../collection/collection.model');

var Vote = bookshelf.Model.extend({
  tableName: 'votes',
  collection: function() {
    return this.belongsTo(Collection);
  },
  user: function() {
    return this.belongsTo(User);
  }
});

module.exports = Vote;