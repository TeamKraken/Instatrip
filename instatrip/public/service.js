angular.module('instatrip.services', [])

.factory('Getdata', function ($http, $state) {

  // var currentImg = '';
  // var secondImg = '';
  var currentImages = [];
  var currentCoords = [];
  var Map;
  var markers = [];
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

        // mark(coords);
        callback(response.routes[0].overview_path, coords);
      });
    }

    initialize();
    var routes = calcRoute(start, end, travelMethod, ourCallback);

//function that takes an array arnd returns an array with 8 evenly spaced points
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
        // currentCoords = [];
        // console.log('currentCoords before :', currentCoords);
        // console.log('currentCoords after :', currentCoords);
      currentCoords = coords;
      // console.log('ourCallback coords', coords)
      return getPhoto({
        coords: coords
      });
    }

  }

  var markMap = function(num) {
    // collect all of the coords/create require objects and put them into markers array
        // markers = [];

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
            position: myLatlng,
            title: 'photo'+i
         });
        markers.push(marker);
    }
    console.log('markers', markers)
    // for (var j= curlen-currentCoords.length; j < curlen; j++){
    //     if (j === num) {
        //   console.log('adding marker'+ j)
        //   markers[j].setMap(Map);
      markers[num].setMap(Map);
    //     } else {
    //       console.log('removing marker'+ j)
    //     }

    // }
    // console.log('markers in markMap', markers);
    // remove all of the markers expect the one need to be marked
    // To add or remove the marker to the map, call setMap();
  }

  var getPhoto = function(routes){
    var imgHolder = [];
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
      for(var i = 0; i < resp.data.length; i++){
   //     console.log("this is the data", resp.data[i][0]);
        imgHolder.push(resp.data[i][0]);
        // picLinks.push(resp.data[i][0].link);
      }
      currentImages = imgHolder;
      // currentLinks = picLinks;
      // currentImg = resp.data[0][0].url;
      // secondImg = resp.data[1][0].url;
      // console.log("Pix: ", pictures)
      $state.go('display.pics');
      return pictures;
    });
  }

  // var getCurrentImg = function(){
  //   return currentImg;
  // }

  // var getSecondImg = function(){
  //   return secondImg;
  // }

  var getImages = function(){
    // console.log("these are our current images", currentImages);
    return currentImages;

  }

  return {
            getmap: getmap,
            getPhoto: getPhoto,
            // getCurrentImg: getCurrentImg,
            // getSecondImg: getSecondImg,
            getImages: getImages,
            markMap: markMap

         };
})
