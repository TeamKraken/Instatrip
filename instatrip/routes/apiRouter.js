var express = require('express');
var instagram = require('../APIs/insta');
var router = express.Router();

// GET photo data based on POSTed map coordinates
router.post('/', function(req, res) {
  var coords = req.body.coords;

  // Return photos object
  var responder = function(data){
    res.send(JSON.stringify(data));
  };

  instagram.obtainInstaData(coords, responder);

});

module.exports = router;
