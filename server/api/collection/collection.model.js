'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CollectionSchema = new Schema({
  title: String,
  description: String,
  // links contained in this collection
  links: [
    {
      url: String,
      description: String,
    }
  ],
  // user_id for the collection's creating user
  user: String,
  // custom url for sharing this collection
  url: String,
  // Array containing user_ids of users who have starred this collection
  starred_users: [String]
});

module.exports = mongoose.model('Collection', CollectionSchema);