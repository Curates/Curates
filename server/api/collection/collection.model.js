'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CollectionSchema = new Schema({
  title: String,
  description: String,
  // links contained in this collection
  links: [
    {
      url: String,
      description: String,
    }
  ],
  // user_id for the collection's creating user
  user: String,
  // custom url for sharing this collection
  url: String,
  // Array containing user_ids of users who have starred this collection
  starred_users: [String]
});

module.exports = mongoose.model('Collection', CollectionSchema);


var knex = require('../../config/db');
var bookshelf = require('bookshelf')(knex);
var Link = require('./link.model');
var Favorite = require('./favorite.model');
var Vote = require('./vote.model');

var Collection = bookshelf.Model.extend({
  table: 'collections',

  favorites: function() {
    return this.hasMany(Favorite);
  },

  votes: function() {
    return this.hasMany(Vote);
  },

  links: function() {
    return this.hasMany(Link);
  }
});