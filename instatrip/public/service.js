angular.module('instatrip.services', [])

.factory('Getdata', function ($http) {
  // Your code hereconsole.log('in services links getlink resp:', resp);
      
  var getmap = function(){
    // var map;
    // function initialize() {
    //   map = new google.maps.Map(document.getElementById('map-canvas'), {
    //     zoom: 8,
    //     center: {lat: -34.397, lng: 150.644}
    //   });
    // }
    // initialize();

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var chicago = new google.maps.LatLng(41.850033, -87.6500523);
      var mapOptions = {
        zoom:7,
        center: chicago
      };
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      directionsDisplay.setMap(map);
    }

    initialize();

  }

  var getphoto = function(){
    return $http({
      method: 'GET',
      url: "/api/links"// todo
    }).then(function(resp){
      console.log('in services Getdata getmap resp.data:', resp.data);
      return resp.data;
    })
  }

  // var getphoto = function(url){
  //     console.log('in services addlink location:', url);
  //   return $http({
  //     method: 'POST',
  //     url: "/api/links",//todo
  //     data: url
  //   }).success(function(resp) {
  //   console.log(resp);
  //   console.log("response url: ",resp.url)
  //   console.log("base url: ",resp.base_url);
  // })
  // .catch(function(err) {
  //   console.log(err);
  // })
  // }
  return { 
            getmap: getmap,
            getphoto: getphoto
         };
})