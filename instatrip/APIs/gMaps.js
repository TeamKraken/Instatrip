// add this to HTML src
// <script src="https://maps.googleapis.com/maps/api/js?key=API_KEY"></script>

// ng-init='initialize()' should be used for the maps page to load map

var googleMapData = function(start, end, travelMethod){
  calcRoute(start, end, travelMethod);


var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
// Remove draggable so view always contains map route
  var rendererOptions = { draggable: false, map: map };
// Renders the start/end into a map with a route on
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

  var marker = new google.maps.Marker({
    // options to place start/end markers 
  })
  var mapOptions = {
    zoom: 5,
    // center: find midpoint between start/end ? 
  }

// document.getElementById("map_canvas") is placement example where the html contains 
// a <div id=map_canvas></div> with map_canvas ID. 
  map = new google.maps.Map('placement of map in html', mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute(start, end, travelMethod) {
  var waypoints = []; // these will be waypoints along the way
  var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.travelMethod, // pull travelMode 
      unitSystem: google.maps.UnitSystem.IMPERIAL,
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
}

module.exports = googleMapData;