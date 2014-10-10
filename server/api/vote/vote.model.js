'use strict';

var bookshelf = require('../../config/db');
require('../user/user.model');
require('../collection/collection.model');

var Vote = bookshelf.Model.extend({
  tableName: 'votes',
  collection: function() {
    return this.belongsTo('Collection');
  },
  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = bookshelf.model('Vote', Vote);