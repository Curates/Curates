'use strict';

var bookshelf = require('../../config/db');
var User = require('../user/user.model');
var Link = require('./link.model');
var Favorite = require('../favorite/favorite.model');
var Vote = require('../vote/vote.model');

var Collection = bookshelf.Model.extend({
  tableName: 'collections',

  user: function() {
    return this.belongsTo(User, 'user_id');
  },

  following: function() {
    return this.hasMany(Favorite, 'collection_id');
  },

  votes: function() {
    var votes = this.hasMany(Vote, 'collection_id');
    console.log(votes);
    return votes;
  },

  links: function() {
    return this.hasMany(Link, 'collection_id');
  }
});

module.exports = Collection;