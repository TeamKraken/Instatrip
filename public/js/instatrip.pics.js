angular.module('instatrip.pics',[])
  .controller('picsCtrl', picsCtrl);


function picsCtrl ($scope, Getdata, $rootScope, $window){
  
  $scope.changeImage = function(){
    $scope.imgs = Getdata.getImages();
    $scope.$emit('content.changed');
    setTimeout(function(){
      $scope.$emit('content.changed');
    },1000);
  };

  $scope.changeImage();

  $scope.openLink = function(location){
    $window.open(location);
  }

  // listen to the broadcast from ng-scrollable
    $scope.$on('photo.moved_0', function(){
      Getdata.markMap(0);
    })
    $scope.$on('photo.moved_1', function(){
      Getdata.markMap(1);
    })
    $scope.$on('photo.moved_2', function(){
      Getdata.markMap(2);
    })
    $scope.$on('photo.moved_3', function(){
      Getdata.markMap(3);
    })
    $scope.$on('photo.moved_4', function(){
      Getdata.markMap(4);
    })
    $scope.$on('photo.moved_5', function(){
      Getdata.markMap(5);
    })
    $scope.$on('photo.moved_6', function(){
      Getdata.markMap(6);
    })
    $scope.$on('photo.moved_7', function(){
      Getdata.markMap(7);
    })
    $scope.$on('photo.moved_8', function(){
      Getdata.markMap(8);
    })
    $scope.$on('photo.moved_9', function(){
      Getdata.markMap(9);
    })
    $scope.$on('photo.moved_10', function(){
      Getdata.markMap(10);
    })
    $scope.$on('photo.moved_11', function(){
      Getdata.markMap(11);
    })
    $scope.$on('photo.moved_12', function(){
      Getdata.markMap(12);
    })
    $scope.$on('photo.moved_13', function(){
      Getdata.markMap(13);
    })
    $scope.$on('photo.moved_14', function(){
      Getdata.markMap(14);
    })
    $scope.$on('photo.moved_15', function(){
      Getdata.markMap(15);
    })
    $scope.$on('photo.moved_16', function(){
      Getdata.markMap(16);
    })
    $scope.$on('photo.moved_17', function(){
      Getdata.markMap(17);
    })
    $scope.$on('photo.moved_18', function(){
      Getdata.markMap(18);
    })
    $scope.$on('photo.moved_19', function(){
      Getdata.markMap(19);
    })
    $scope.$on('photo.moved_20', function(){
      Getdata.markMap(20);
    })

}
