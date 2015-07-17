var instagram = require('instagram-node-lib');
var keys = require('../config.js');
instagram.set('client_id', keys.InstaClientID);
instagram.set('client_secret', keys.InstaClientSecret);

module.exports = {

  getInstaData : function(latitude, longitude, distance, callback){
    instagram.media.search({lat: latitude, lng: longitude, distance: distance, complete: function(data){
      callback(data);
    }});
  },

  obtainInstaData : function(latitude, longitude, distance){
    this.getInstaData(latitude,longitude,distance, function(data){
      newArray = [];
      for(var i = 0; i < data.length; i++){
        newArray.push({
          link: data[i].link,
          url: data[i].images.low_resolution.url,
          location: data[i].location
        });
      }
      return newArray;
    });
  }

};
