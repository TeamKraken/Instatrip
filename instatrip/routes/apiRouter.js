var express = require('express');
var instagram = require('../APIs/insta');
var router = express.Router();

// GET photo data based on POSTed map coordinates
router.post('/', function(req, res) {

  var coords = req.body.coords;

  // Return photos object
  instagram.loopResponse(coords, dist, res.send);

  // For testing only:
  // res.send('POST request received. Thanks David!');
});

module.exports = router;
