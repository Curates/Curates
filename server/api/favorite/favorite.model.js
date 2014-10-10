'use strict';

var bookshelf = require('../../config/db');
require('../collection/collection.model');
require('../user/user.model');

var Favorite = bookshelf.Model.extend({
  tableName: 'favorites',
  collection: function() {
    return this.belongsTo('Collection');
  },

  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = bookshelf.model('Favorite', Favorite);