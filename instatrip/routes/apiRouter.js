var express = require('express');
var instagram = require('../APIs/insta');
var router = express.Router();

// GET photo data based on POSTed map coordinates
router.post('/', function(req, res) {
  var photos = [];
  var lat, lng, dist = 300; // dist unit: m, max: 5000m

  var coords = req.body.coords;
  for (var i = 0; i < coords.length; i++){
    lat = coords[i].lat;
    lng = coords[i].lng;
    photos.push(instagram.obtainInstaData(lat, long, dist));
  }

  // Return photos object
  // res.send(JSON.stringify(photos));

  // For testing only:
  res.send('POST request received. Thanks David!');
});

module.exports = router;
