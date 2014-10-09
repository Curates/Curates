'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

// Get list of users
// restriction: 'admin'
exports.index = function(req, res) {
  new User().fetchAll()
    .then(function(users) {
      return res.json(200, users.omit('salt', 'password'));
    })
    .catch(function(err) {
      return validationError(res, err);
    });
};

// Creates a new user
exports.create = function (req, res, next) {
  req.body.provider = 'local';

  new User(req.body)
    .save()
    .then(function(user) {
      var token = jwt.sign({id: user.id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
      res.json({ token: token });
    })
    .catch(function(err) {
      return validationError(res, err);
    });
};

// Get a single user
exports.show = function (req, res, next) {
  new User({id: req.params.id})
    .fetch({withRelated: ['collections', 'favorites']})
    .then(function(user) {
      return res.json({
        user: user.profile,
        collections: user.related('collections').toJSON(),
        favorites: user.related('favorites').toJSON()
      });
    })
    .catch(function(err) {
      validationError(res, err);
    })
};

// Delete a user
// restriction: 'admin'
exports.destroy = function(req, res) {
  new User({id: req.param.id})
    .fetch({withRelated: ['favorites', 'collections', 'links']})
    .then(function(user) {
      user.related('favorites').invokeThen('destroy');
      user.related('collections').invokeThen('destroy');
      user.related('links').invokeThen('destroy')
        .then(function () {
          return user.destroy()
            .then(function () {
              return res.send(204);
            });
        })
        .catch(function(err) {
          return validationError(res, err);
        });
    });
};


// Change a user's password
exports.changePassword = function(req, res, next) {
  new User({id: req.user.id})
    .fetch()
    .then(function(user) {
      if (user.authenticate(req.body.oldPassword)) {
        user.set('password', req.body.newPass);
        user.save()
          .then(function() {
            return res.send(200);
          })
          .catch(function(err) {
            return validationError(res, err);
          })
      } else {
        return res.send(403);
      }
    })
    .catch(function(err) {
      return validationError(res, err);
    });
};

// Get my info
exports.me = function(req, res, next) {
  new User({id: req.params.id})
    .fetch({withRelated: ['collections', 'favorites']})
    .then(function(user) {
      return res.json({
        user: user.omit('salt', 'password'),
        collections: user.related('collections').toJSON(),
        favorites: user.related('favorites').toJSON()
      });
    })
    .catch(function(err) {
      validationError(res, err);
    })
};

// Authentication callback
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
