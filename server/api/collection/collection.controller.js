'use strict';

var _ = require('lodash');
var Collection = require('./collection.model');
var User = require('../user/user.model');

// Get list of collections
exports.index = function(req, res) {
  Collection.find(function (err, collections) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, collections);
  });

  // TODO: Refactor to use REDIS K:V LRU cache for faster access
  // new Collection({})
  //   .fetchAll()
  //   .then(function(collections) {
  //     return res.json(200, collections)
  //   })
  //   .catch(function(err) {
  //     return handleError(res, err);
  //   });
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
    return res.json(200, collection);
  });

  // new Collection({id: req.params.id})
  //   .fetch({withRelated:['links', 'votes', 'favorites']})
  //   .then(function(collection) {
  //     if (!collection) {
  //       return res.send(404);
  //     }
  //     return res.json(200, {
  //       collection: collection,
  //       links: collection.related('links').toJSON(),
  //       votes: collection.related('votes').toJSON(),
  //       favorites: collection.related('favorites').toJSON()
  //     });
  //   })
  //   .catch(function(err) {
  //     return handleError(res, err);
  //   });
};

// Creates a new collection in the DB.
exports.create = function(req, res) {
  Collection.create(req.body, function(err, collection) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, collection);
  });

  // new Collection(req.body).save()
  //   .then(function(collection) {
  //     return res.json(201, collection);
  //   })
  //   .catch(function(err) {
  //     return handleError(res, err);
  //   })
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
    var updated = _.merge(collection, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err); 
      }
      return res.json(200, collection);
    });
  });

  // new Collection({id: req.params.id})
  //   .fetch()
  //   .then(function(collection) {
  //     if (!collection) {
  //       return res.send(404);
  //     }
  //     var updated = _.merge(collection, req.body);
  //     updated.save()
  //       .then(function(collection) {
  //         return res.json(200, collection);
  //       })
  //       .catch(function(err) {
  //         return handleError(res, err);
  //       });
  //   })
  //   .catch(function(err) {
  //     return handleError(res, err);
  //   });
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

  // new Collection({id: req.param.id})
  //   .fetch({withRelated: ['favorites', 'votes', 'links']})
  //   .then(function(collection) {
  //     collection.related('favorites').invokeThen('destroy');
  //     collection.related('votes').invokeThen('destroy');
  //     collection.related('links').invokeThen('destroy')
  //       .then(function () {
  //         return collection.destroy()
  //           .then(function () {
  //             return res.send(204);
  //           });
  //       })
  //       .catch(function(err) {
  //         return handleError(res, err);
  //       });
  //   });
};

// Fetch a users collections
exports.userCollections = function(req, res, next) {
  var userId = req.params.id;

  Collection.find({user: userId}, function (err, collections) {
    if (err) {
      return handleError(res, err);
    }
    res.json(200, collections);
  });

  // new User({id: req.params.id})
  //   .fetch({withRelated: ['collections', 'favorites', 'votes']})
  //   .then(function(user) {
  //     if (!user) {
  //       return res.send(404);
  //     }
  //     return res.json(200, {
  //       user: user,
  //       links: user.related('collections').toJSON(),
  //       votes: user.related('faovirtes').toJSON(),
  //       favorites: user.related('votes').toJSON()
  //     });
  //   })
  //   .catch(function(err) {
  //     return handleError(res, err);
  //   });
};

function handleError(res, err) {
  return res.send(500, err);
}