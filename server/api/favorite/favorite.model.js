'use strict';

var bookshelf = require('../../config/db');
var Collection = require('../collection/collection.model');
var User = require('../user/user.model');

var Favorite = bookshelf.Model.extend({
  tableName: 'favorites',
  collection: function() {
    return this.belongsTo(Collection);
  },

  user: function() {
    return this.belongsTo(User);
  }
});

module.exports = Favorite;