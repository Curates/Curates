'use strict';

var _ = require('lodash');
var Collection = require('./collection.model');
var bookshelf = require('../../config/db');
var User = require('../user/user.model');

var Collections = bookshelf.Collection.extend({model: Collection});

// Get list of collections
exports.index = function(req, res) {
  // TODO: Refactor to use REDIS K:V LRU cache for faster access
  new Collection().fetchAll()
    .then(function(collections) {
      console.log('made it here..')
      return res.status(200).json(collections)
    })
    .catch(function(err) {
      console.log('got an error');
      return handleError(res, err);
    });
};

// Get a single collection
exports.show = function(req, res) {
  new Collection({id: req.params.id})
    .fetch({withRelated:['links', 'votes', 'following']})
    .then(function(collection) {
      if (!collection) {
        return res.send(404);
      }
      return res.status(200).json({
        collection: collection,
        links: collection.related('links').toJSON(),
        votes: collection.related('votes').toJSON(),
        favorites: collection.related('following').toJSON()
      });
    })
    .catch(function(err) {
      return handleError(res, err);
    });
};

// Creates a new collection in the DB.
exports.create = function(req, res) {
  var newColl = new Collection(req.body);
  newColl.save()
    .then(function(collection) {
      return res.status(201).json(collection);
    })
    .catch(function(err) {
      return handleError(res, err);
    })
};

// Updates an existing collection in the DB.
exports.update = function(req, res) {
  new Collection({id: req.params.id})
    .fetch()
    .then(function(collection) {
      if (!collection) {
        return res.send(404);
      }
      var updated = _.merge(collection, req.body);
      updated.save()
        .then(function(collection) {
          return res.status(200).json(collection);
        })
        .catch(function(err) {
          return handleError(res, err);
        });
    })
    .catch(function(err) {
      return handleError(res, err);
    });
};

// Deletes a collection from the DB.
exports.destroy = function(req, res) {
  new Collection({id: req.param.id})
    .fetch({withRelated: ['following', 'votes', 'links']})
    .then(function(collection) {
      collection.related('following').invokeThen('destroy');
      collection.related('votes').invokeThen('destroy');
      collection.related('links').invokeThen('destroy')
        .then(function () {
          return collection.destroy()
            .then(function () {
              return res.send(204);
            });
        })
        .catch(function(err) {
          return handleError(res, err);
        });
    });
};

// Fetch a users collections
exports.userCollections = function(req, res, next) {
  new User({id: req.params.id})
    .fetch({withRelated: ['collections', 'following', 'votes']})
    .then(function(user) {
      if (!user) {
        return res.send(404);
      }
      return res.status(200).json({
        user: user,
        links: user.related('collections').toJSON(),
        following: user.related('following').toJSON(),
        votes: user.related('votes').toJSON()
      });
    })
    .catch(function(err) {
      return handleError(res, err);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}