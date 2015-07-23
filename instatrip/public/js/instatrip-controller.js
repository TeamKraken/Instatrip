angular
  .module('instatrip')
  .controller('mainCtrl',['$scope', 'Getdata', '$rootScope', mainCtrl]); 

function mainCtrl ($scope, Getdata, $rootScope) {
  $scope.getmap = Getdata.getmap;
  
  $rootScope.$on("$stateChangeStart", function (event){
    console.log('Initializing map..')
    setTimeout($scope.makeMap, 50);
  })

  $scope.setScope = function(start, end, method){
    $rootScope.start = start;
    $rootScope.end = end;
    $rootScope.travelMethod = method || 'DRIVING'
  }

  $scope.makeMap = function(){
    console.log('Map loaded')
    Getdata.getmap($rootScope.start, $rootScope.end, $rootScope.travelMethod);
    $scope.$broadcast('content.reload')
  }

}