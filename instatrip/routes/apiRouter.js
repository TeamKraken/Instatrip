var express = require('express');
var instagram = require('../APIs/insta');
var router = express.Router();

// GET photo data based on POSTed map coordinates
router.post('/', function(req, res) {
  // TODO extract map coordinates from req object
  // var lat = req.body.lat;
  // var long = req.body.long;
  // var dist = 300; // Units: m, Max is 5000m

  var photos = obtainInstaData(lat, long, dist);

  // Return photos object
  // res.send(photos);

  // For testing only:
  res.send('POST request received. Thanks David!');
});

module.exports = router;
