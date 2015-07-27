angular.module('instatrip.services', [])

.factory('Getdata', function ($http, $state) {

  // var currentImg = '';
  // var secondImg = '';
  var currentImages = [];
  var currentCoords = [];
  var Map;
  var markers = [];
  var currentMarker;
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
      Map = map;
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
      var eightPts = find7(response.routes[0].overview_path);
      console.log("find7 routes: ", eightPts);
      var coords = [];
      for(var i = 0; i < eightPts.length; i++){
        coords.push({
          lat: eightPts[i].A,
          lng: eightPts[i].F
        });
      }
        currentCoords = coords;

        // mark(coords);
        callback(response.routes[0].overview_path, coords);
      });
    }

    initialize();
    var routes = calcRoute(start, end, travelMethod, ourCallback);

// take variable length array and return an array with 15 evenly spaced points
    var find7 = function(input){
        var len = input.length;
        var divis;
        var output = [];
        if (len > 15){
            divis = Math.floor(len / 15);
        } else {
            divis = 15;
        }

        for(var i = 0; i < len; i+=divis){
            output.push(input[i]);
        }
        return output;
    };


    function ourCallback(routes, coords){
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

  var markMap = function(num) {
    // collect all of the coords/create require objects and put them into markers array

    var curlen = markers.length;
    if (curlen > 0){
      for (var j = 0; j < curlen; j++){
          markers[j].setMap(null);
      }
    }
        markers = [];
    for (var i = 0; i< currentCoords.length; i++){
        var myLatlng = new google.maps.LatLng(currentCoords[i]['lat'] ,currentCoords[i]['lng']);
        var marker = new google.maps.Marker({
            position: myLatlng
         });
        markers.push(marker);
    }
    // remove all of the markers expect the one need to be marked
    // To add or remove the marker to the map, call setMap();
    for (var j=0; j < currentCoords.length; j++){
        if (j === num) {
          if (currentMarker !== num){
            currentMarker = num;
            markers[j].setMap(Map);
          }
        } else {
          markers[j].setMap(null);
        }

    }
  };

  var getPhoto = function(routes){
    var imgHolder = [];
    var linkHolder = {};
    // var pictures = [];
    // var picLinks = [];
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

      var respLength = resp.data.length;

      for(var i = 0; i < respLength; i++){
        for (var j = 0; j < resp.data[i].length; j++){
          if (!(resp.data[i][j].link in linkHolder)){
            linkHolder[resp.data[i][j].link] = resp.data[i][j];
            imgHolder.push(resp.data[i][j]);
            break;
          }
        }
      }
      currentImages = imgHolder;
      $state.go('display.pics');
      return currentImages;
    });
  }

  var getImages = function(){
    return currentImages;

  }

  return {
            getmap: getmap,
            getPhoto: getPhoto,
            getImages: getImages,
            markMap: markMap

         };
})
