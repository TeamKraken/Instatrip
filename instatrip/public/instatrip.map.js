angular.module('instatrip.map',[])
  .controller('mapCtrl', mapCtrl);

  // $rootScope.$on("$stateChangeStart", function (event){
  //   console.log('Initializing map..')
  //   setTimeout($scope.makeMap, 50);
  // })

function mapCtrl ($scope, Getdata, $rootScope){
  $scope.getmap = Getdata.getmap;

  $scope.makeMap = function(){
    console.log('Map loaded')
    Getdata.getmap($rootScope.start, $rootScope.end, $rootScope.travelMethod);
    // $scope.$broadcast('content.reload')
//    Getdata.markMap(0)
  }

  $scope.makeMap();
}