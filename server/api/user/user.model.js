'use strict';

var crypto = require('crypto');
var authTypes = ['twitter', 'facebook', 'google'];

var bookshelf = require('../../config/db');
bookshelf.plugin('virtuals');
var Collection = require('../collection/collection.model');
var Favorite = require('../favorite/favorite.model');
var Vote = require('../vote/vote.model');

var User = bookshelf.Model.extend({
  
  tableName: 'users',

  hasTimestamps: true,

  initialize: function() {

    this.on('created', function(model) {
      // Do not hash password if an outh strategy was used to register
      if (authTypes.indexOf(model.provider) === -1) {
        model.salt = model.makeSalt();
        model.password = model.encryptPassword(model.password);
      }
      this.set('salt', model.salt);
      this.set('password', model.salt).save();
    });

  },

  virtuals: {
    // Public profile information
    profile: function() {
      return {
        'name': this.get('first_name') + ' ' + this.get('last_name'),
        'role': this.get('role')
      };
    },

    // Auth token
    token: function() {
      return {
        '_id': this.get('id'),
        'role': this.get('role')
      };
    }
  },

  authenticate: function(plainText, password) {
    return this.encryptPassword(plainText) === this.get('password');
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function() {
    return crypto.randomBytes(128).toString('base64');
  },

  collections: function() {
    this.hasMany(Collection);
  },

  favorites: function() {
    this.hasMany(Favorite);
  },

  votes: function() {
    this.hasMany(Vote);
  }
  
});

module.exports = User;
