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
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) {
      return res.send(500, err)
    }
    res.json(200, users);
  });

  // new User({})
  //   .fetchAll()
  //   .then(function(users) {
  //     return res.json(200, users.omit('salt', 'password'));
  //   })
  //   .catch(function(err) {
  //     return validationError(res, err);
  //   });
};

// Creates a new user
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) {
      return validationError(res, err);
    }
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
    res.json({ token: token });
  });

  // new User(req.body)
  //   .save()
  //   .then(function(user) {
  //     var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
  //     res.json({ token: token });
  //   })
  //   .catch(function(err) {
  //     return validationError(res, err);
  //   });
};

// Get a single user
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.send(401)
    }
    res.json(user.profile);
  });

  // new User({id: req.params.id})
  //   .fetch({withRelated: ['collections', 'favorites']})
  //   .then(function(user) {
  //     return res.json({
  //       user: user,
  //       collections: user.related('collections').toJSON(),
  //       favorites: user.related('favorites').toJSON()
  //     });
  //   })
  //   .catch(function(err) {
  //     validationError(res, err);
  //   })
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) {
      return res.send(500, err)
    }
    return res.send(204);
  });

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

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) {
          return validationError(res, err)
        }
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.json(401)
    }
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
