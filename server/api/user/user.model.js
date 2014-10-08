'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['twitter', 'facebook', 'google'];

var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  twitter: {},
  google: {},
  github: {},
  favorites: [String]
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);


var knex = require('../../config/db');
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('virtuals');
var Collection = require('../collection/collection.model');
var Favorite = require('../collection/favorite.model');
var Vote = require('../collection/vote.model');

var User = bookshelf.Model.extend({
  
  table: 'users',

  initialize: function() {
    this.on('saving', function(model, attrs, options) {

      if (validatePresenceOf(this.get('password')) && authTypes.indexOf(this.get('provider')) === -1) {
        this.set('salt', this.makeSalt());
        this.set('password', this.encryptPassword(this.get('password')));
      }

    });

    this.on('created', function() {
      // Email?
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

    token: function() {
      return {
        '_id': this._id,
        'role': this.role
      };
    }
  },

  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.get('password');
  },

  encryptPassword: function(password) {
    if (!password || !this.get('salt')) return '';
    var salt = new Buffer(this.get('salt'), 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  },

  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
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
