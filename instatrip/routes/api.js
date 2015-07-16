var express = require('express');
var router = express.Router();
var instagram = require('instagram');
var gmaps = require('gmaps');

// GET map and photo data
router.post('/', function(req, res, next) {
  res.send('JSON object');
});

module.exports = router;
