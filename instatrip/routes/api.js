var express = require('express');
var router = express.Router();
// var instagram = require('instagram'); // TODO rename required file to match js file created by Ryan?

// GET photo data based on POSTed map coordinates
router.post('/', function(req, res) {
  var lat = req.body.lat;
  var long = req.body.long;
  var dist = 5; // Units: km, Max is 5 km

  var photos = getInstaData(lat, long, dist);

  res.send(photos);
});

module.exports = router;
