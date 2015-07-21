var instagram = require('instagram-node-lib');
var keys = require('../config.js');
var debug = require('debug')('server');
instagram.set('client_id', keys.InstaClientID);
instagram.set('client_secret', keys.InstaClientSecret);

module.exports = {

  getInstaData : function(latitude, longitude, distance, callback){
    instagram.media.search({lat: latitude, lng: longitude, distance: distance, complete: function(data){
      callback(data);
    }});
  },

  sortInstaData: function(photos, coords){
        // calculate direction of travel
        var origin = coords[0];
        var destination = coords[1];

        // Sort photos based on longitude and direction of travel
        if (origin.lng > destination.lng){
          photos.sort(function(a, b){
            return b[0].location.longitude - a[0].location.longitude;
          });
        } else {
          photos.sort(function(a, b){
            return a[0].location.longitude - b[0].location.longitude;
          });
        }

        return photos;
  },

  // call to instagram for each coordinate set and return to client
  obtainInstaData : function(coords, callback){
    var results = [];
    var lat, lng, dist = 300; // dist unit: m, max: 5000m

    // parse instagram data object
    var photoParser =  function(data){
      var photoArray = [];
      for(var i = 0; i < data.length; i++){
        photoArray.push({
          link: data[i].link,
          url: data[i].images.low_resolution.url,
          location: data[i].location
        });
      }
      results.push(photoArray);

      // check if all api calls have been processed, sort, return to client
      if (results.length === coords.length){
        results = this.sortInstaData(results, coords);
        callback(results);
      }
    };

    for (var i = 0; i < coords.length; i++){
      lat = coords[i].lat;
      lng = coords[i].lng;
      this.getInstaData(lat, lng, dist, photoParser.bind(this));
    }

  }

};
