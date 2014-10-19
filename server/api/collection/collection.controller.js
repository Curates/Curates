'use strict';

var _ = require('lodash');
var bookshelf = require('../../config/db');
var Collection = require('./collection.model');
var User = require('../user/user.model');
var Link = require('./link.model');

// Get list of collections
exports.index = function(req, res) {
  new Collection()
    .fetchAll({withRelated:['votes']})
    .then(function(collections) {
      return res.json(200, collections)
    })
    .catch(function(err) {
      return handleError(res, err);
    });
};

// Get a single collection
exports.show = function(req, res) {
  new Collection({id: req.params.id})
    .fetch({withRelated:['links', 'votes', 'favorites']})
    .then(function(collection) {
      return res.json(200, collection);
    })
    .catch(function(err) {
      console.log(err);
      return handleError(res, err);
    });
};

// Creates a new collection in the DB.
exports.create = function(req, res) {
  var newColl = new Collection(req.body);
  newColl.fetch()
    .then(function(found) {
      if (!found) {
        newColl.save()
          .then(function(collection) {
            return res.json(201, collection);
          })
          .catch(function(err) {
            return handleError(res, err);
          });
      }
    })
    .catch(function(err) {
      return handleError(res, err);
    });

};

// Updates an existing collection in the DB.
exports.update = function(req, res) {
  new Collection({id: req.params.id})
    .fetch()
    .then(function(collection) {
      // Ensure the collection exists before attempting to save
      if (!collection) {
        return res.send(404);
      }

      // Create new links or update with new descriptions
      req.body.links.forEach(function(link) {
        new Link(link).save();
      });

      // Update the collection itself by overwriting the properties
      var updated = _.merge(collection, req.body);
      updated.save()
        .then(function(collection) {
          // No need to send back the updated collection because client
          // is cacheing changes.
          return res.send(200);
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
    .fetch({withRelated: ['favorites', 'votes', 'links']})
    .then(function(collection) {
      collection.related('favorites').invokeThen('destroy');
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
    .fetch({withRelated: ['collections']})
    .then(function(user) {
      return res.json(200, user.related('collections'));
    })
    .catch(function(err) {
      return handleError(res, err);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}