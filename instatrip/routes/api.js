var express = require('express');
var router = express.Router();
var instagram = require('instagram'); // TODO rename required file to match js file created by Ryan?
var gmaps = require('gmaps'); // TODO rename required file to match js file created by James?

// GET photo data based on POSTed map coordinates
router.post('/', function(req, res) {
  // TODO refactor to properly access lat and long properties of req object
  var lat = req.body.lat;
  var long = req.body.long;

  var photos = instagram(lat, long);
  // TODO extract desired components of photos API object


  res.send(photos);
});

module.exports = router;
