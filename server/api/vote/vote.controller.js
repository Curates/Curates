'use strict';

var _ = require('lodash');
var Vote = require('./vote.model');

// Creates a new vote
exports.create = function(req, res) {
  
  new Vote(req.body)
    .save()
    .then(function(vote) {
      return res.json(201, vote);
    })
    .catch(function(err) {
      return handleError(res, err);
    });
};

// Remote a vote from the DB.
exports.destroy = function(req, res) {
  new Vote({id: req.params.id})
    .fetch()
    .then(function(vote) {
      vote.destroy()
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