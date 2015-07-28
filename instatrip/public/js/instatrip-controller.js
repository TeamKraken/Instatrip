angular
.module('instatrip')
.controller('mainCtrl',['$scope', '$rootScope', mainCtrl])

function mainCtrl($scope, $rootScope){

  $scope.setScope = function(start, end, method){
    $rootScope.start = start;
    $rootScope.end = end;
    $rootScope.travelMethod = method || 'DRIVING';
  }

}
