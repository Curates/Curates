'use strict';

var _ = require('lodash');
var Favorite = require('./favorite.model');

// Add a favorite
exports.create = function(req, res) {
  new Favorite(req.body)
    .save()
    .then(function(favorite) {
      return res.json(201, favorite);
    })
    .catch(function(err) {
      return handleError(res, err);
    });
};

// Remote a favorite
exports.destroy = function(req, res) {
  new Favorite({id: req.params.id})
    .fetch()
    .then(function(favorite) {
      favorite.destroy()
        .then(function() {
          return res.send(204);
        })
        .catch(function(err) {
          return res.send(404);
        });
    })
    .catch(function(err) {
      return handleError(res, err);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}