angular.module('instatrip.services', [])

.factory('Getdata', function ($http) {
      
  var getmap = function(start,end,travelMethod){
    var trvmthd = travelMethod;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var MakerSquare = new google.maps.LatLng(37.787518, -122.399868);
      var mapOptions = {
        zoom:7,
        center: MakerSquare,
        disableDefaultUI: true,
        zoomControl: true,
           zoomControlOptions: {
             style: google.maps.ZoomControlStyle.SMALL
           }
      };
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      directionsDisplay.setMap(map);
    }

    function calcRoute(start, end, travelMethod, callback) {
      var waypoints = []; // these will be waypoints along the way
      console.log(travelMethod);
      var request = {
          origin: start,
          destination: end,
          // travelMode: google.maps.TravelMode.travelMethod, // pull travelMode
          travelMode: google.maps.TravelMode.travelMethod,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
        callback(response.routes[0].overview_path[0]);
      });
    }

    initialize();
    var routes = calcRoute(start, end, trvmthd, ourCallback);

    function ourCallback(routes){
      var lat = routes.A;
      var lng = routes.F;
      console.log("lat: ", lat,"long: ", lng);
      getPhoto({
        coords: [
          {
            lat: lat,
            lng: lng
          }
        ]
      });
    }


  }


  var getPhoto = function(routes){
    return $http({
      method: 'POST',
      url: "/search",
      data: routes

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
            getmap: getmap
         };
})