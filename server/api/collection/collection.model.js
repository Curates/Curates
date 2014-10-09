'use strict';

var bookshelf = require('../../config/db');
require('../user/user.model');
require('./link.model');
require('../favorite/favorite.model');
require('../vote/vote.model');

var Collection = bookshelf.Model.extend({
  tableName: 'collections',

  user: function() {
    return this.belongsTo('User');
  },

  favorites: function() {
    return this.hasMany('Favorite');
  },

  votes: function() {
    return this.hasMany('Vote');
  },

  links: function() {
    return this.hasMany('Link');
  }
});

module.exports = bookshelf.model('Collection', Collection);