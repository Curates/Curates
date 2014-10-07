'use strict';

var _ = require('lodash');
var Collection = require('./collection.model');

// Get list of collections
exports.index = function(req, res) {
  Collection.find(function (err, collections) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, collections);
  });
};

// Get a single collection
exports.show = function(req, res) {
  Collection.findById(req.params.id, function (err, collection) {
    if (err) {
      return handleError(res, err);
    }
    if (!collection) {
      return res.send(404);
    }
    return res.json(collection);
  });
};

// Creates a new collection in the DB.
exports.create = function(req, res) {
  Collection.create(req.body, function(err, collection) {
    console.log(req.body);
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, collection);
  });
};

// Updates an existing collection in the DB.
exports.update = function(req, res) {
  // Ensure the database id is not overwritten
  if (req.body._id) {
    delete req.body._id; 
  }
  Collection.findById(req.params.id, function (err, collection) {
    if (err) {
      return handleError(res, err); 
    }
    if (!collection) {
      return res.send(404); 
    }
    console.log(collection, req.body);
    var updated = _.merge(collection, req.body);
    console.log(updated);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err); 
      }
      return res.json(200, collection);
    });
  });
};

// Deletes a collection from the DB.
exports.destroy = function(req, res) {
  Collection.findById(req.params.id, function (err, collection) {
    if (err) {
      return handleError(res, err);
    }
    if (!collection) {
      return res.send(404);
    }
    collection.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}