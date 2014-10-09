'use strict';

var express = require('express');
var controller = require('./favorite.controller');

var router = express.Router();

router.post('/', controller.create);
router.delete('/:id', controller.destroy);

module.exports = router;