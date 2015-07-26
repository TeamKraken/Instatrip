angular.module('instatrip.pics',[])
  .controller('picsCtrl', picsCtrl);


function picsCtrl ($scope, Getdata, $rootScope, $window){
  
  $scope.changeImage = function(){
    console.log('Changing images in picsCtrl');
    $scope.imgs = Getdata.getImages();
    $scope.$broadcast('rebuild:me'); 
  };

  $scope.$on('$viewContentLoaded', $scope.changeImage);

  $scope.openLink = function(location){
    $window.open(location);
  }
}