angular.module('instatrip.services', [])

.factory('Getdata', function ($http) {

  var currentImg = '';
  var secondImg = '';
      
  var getmap = function(start,end,travelMethod){
    travelMethod = travelMethod || 'DRIVING';
    start = start || 'San Francisco';
    end = end || 'Oakland';
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
      var request = {
          origin: start,
          destination: end,
          // travelMode: google.maps.TravelMode.travelMethod, // pull travelMode
          travelMode: google.maps.TravelMode[travelMethod],
          unitSystem: google.maps.UnitSystem.IMPERIAL,
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
        callback(response.routes[0].overview_path);
      });
    }

    initialize();
    var routes = calcRoute(start, end, travelMethod, ourCallback);

    function ourCallback(routes){
      // console.log("routes: ", routes);
      var startLat = routes[0].A;
      var startLng = routes[0].F;
      var numPoints = routes.length;
      var endLat = routes[numPoints-1].A;
      var endLng = routes[numPoints-1].F;

      return getPhoto({
        coords: [
          {
            lat: startLat,
            lng: startLng
          },
          {
            lat: endLat,
            lng: endLng
          }
        ]
      });
    }

  }


  var getPhoto = function(routes){
    var pictures = [];
    return $http({
      method: 'POST',
      url: "/search",
      data: routes

    }).then(function(resp){
      console.log("response data: ", resp.data);
      console.log('Photo URL: ', resp.data[0][0].url);
      resp.data.forEach(function(arrayOfPictures){
        arrayOfPictures.forEach(function(picture){
          pictures.push(picture)
        })
      })
      currentImg = resp.data[0][0].url;
      secondImg = resp.data[1][0].url;
      console.log("Pix: ", pictures)
      return pictures;
    });
  }

  var getCurrentImg = function(){
    return currentImg;
  }

  var getSecondImg = function(){
    return secondImg;
  }

  return { 
            getmap: getmap,
            getPhoto: getPhoto,
            getCurrentImg: getCurrentImg,
            getSecondImg: getSecondImg
         };
})