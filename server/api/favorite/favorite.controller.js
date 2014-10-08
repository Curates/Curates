'use strict';

var _ = require('lodash');
var Favorite = require('./favorite.model');

// Get list of favorites
exports.index = function(req, res) {
  Favorite.find(function (err, favorites) {
    if(err) { return handleError(res, err); }
    return res.json(200, favorites);
  });
};

// Get a single favorite
exports.show = function(req, res) {
  Favorite.findById(req.params.id, function (err, favorite) {
    if(err) { return handleError(res, err); }
    if(!favorite) { return res.send(404); }
    return res.json(favorite);
  });
};

// Creates a new favorite in the DB.
exports.create = function(req, res) {
  Favorite.create(req.body, function(err, favorite) {
    if(err) { return handleError(res, err); }
    return res.json(201, favorite);
  });
};

// Updates an existing favorite in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Favorite.findById(req.params.id, function (err, favorite) {
    if (err) { return handleError(res, err); }
    if(!favorite) { return res.send(404); }
    var updated = _.merge(favorite, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, favorite);
    });
  });
};

// Deletes a favorite from the DB.
exports.destroy = function(req, res) {
  Favorite.findById(req.params.id, function (err, favorite) {
    if(err) { return handleError(res, err); }
    if(!favorite) { return res.send(404); }
    favorite.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}