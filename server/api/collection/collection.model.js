'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CollectionSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Collection', CollectionSchema);