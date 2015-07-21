angular.module('instatrip.services', [])

.factory('Getdata', function ($http, $state) {

  var currentImg = '';
  var secondImg = '';
  var currentImages = [];
      
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

//function that takes an array arnd returns an array with 8 evenly spaced points
    var find7 = function(input){
        var len = input.length;
        var divis;
        var output = [];
        if (len > 7){
            divis = Math.floor(len / 7);
        } else {
            divis = 7;
        }
        
        for(var i = 0; i < len; i+=divis){
            output.push(input[i]);
        }
        return output;
    };

    function ourCallback(routes){
      console.log("find7 routes: ", find7(routes));
      var eightPts = find7(routes);
      var coords = [];
      for(var i = 0; i < eightPts.length; i++){
        coords.push({
          lat: eightPts[i].A,
          lng: eightPts[i].F
        });
      }
      console.log("8pts: ",coords);
      var startLat = routes[0].A;
      var startLng = routes[0].F;
      var numPoints = routes.length;
      var endLat = routes[numPoints-1].A;
      var endLng = routes[numPoints-1].F;

      return getPhoto({
        coords: coords
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
      // resp.data.forEach(function(arrayOfPictures){
      //   arrayOfPictures.forEach(function(picture){
      //     pictures.push(picture)
      //   })
      // })
      for(var i = 0; i < resp.data.length; i++){
        pictures.push(resp.data[i][0].url);
      }
      currentImages = pictures;
      currentImg = resp.data[0][0].url;
      secondImg = resp.data[1][0].url;
      console.log("Pix: ", pictures)
      $state.go('display.pics');
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