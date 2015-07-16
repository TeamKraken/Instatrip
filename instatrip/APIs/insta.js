var instagram = require('instagram-node-lib');
var keys = require('../config.js');
instagram.set('client_id', 'INSERT ID');
instagram.set('client_secret', 'INSERT SECRET')

module.exports= {

  getInstaData = function(latitude, longitude, distance){
    instagram.media.search({lat: latitude, lng: longitude, distance: distance})
  }
}

