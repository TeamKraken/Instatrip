angular.module('instatrip.pics',[])
  .controller('picsCtrl', picsCtrl);


function picsCtrl ($scope, Getdata, $rootScope, $window){
  
  $scope.changeImage = function(){
    console.log('Changing images in picsCtrl');
    $scope.imgs = Getdata.getImages();
    $scope.$emit('content.changed');
    setTimeout(function(){
      console.log('rebuild');
      $scope.$emit('content.changed');
    },1000);
  };

  $scope.changeImage();

  $scope.openLink = function(location){
    $window.open(location);
  }

  // listen to the broadcast from ng-scrollable
    $scope.$on('photo.moved_0', function(){
      // console.log('photo moved 0!')
      Getdata.markMap(0);
    })
    $scope.$on('photo.moved_1', function(){
      // console.log('photo moved 1!')
      Getdata.markMap(1);
    })
    $scope.$on('photo.moved_2', function(){
      // console.log('photo moved 2!')
      Getdata.markMap(2);
    })
    $scope.$on('photo.moved_3', function(){
      // console.log('photo moved 3!')
      Getdata.markMap(3);
    })
    $scope.$on('photo.moved_4', function(){
      // console.log('photo moved 4!')
      Getdata.markMap(4);
    })
    $scope.$on('photo.moved_5', function(){
      // console.log('photo moved! 5')
      Getdata.markMap(5);
    })
    $scope.$on('photo.moved_6', function(){
      // console.log('photo moved! 6')
      Getdata.markMap(6);
    })
    $scope.$on('photo.moved_7', function(){
      // console.log('photo moved! 7')
      Getdata.markMap(7);
    })
    $scope.$on('photo.moved_8', function(){
      // console.log('photo moved! 8')
      Getdata.markMap(8);
    })
    $scope.$on('photo.moved_9', function(){
      // console.log('photo moved! 9')
      Getdata.markMap(9);
    })
    $scope.$on('photo.moved_10', function(){
      // console.log('photo moved! 10')
      Getdata.markMap(10);
    })
    $scope.$on('photo.moved_11', function(){
      // console.log('photo moved! 11')
      Getdata.markMap(11);
    })
    $scope.$on('photo.moved_12', function(){
      // console.log('photo moved! 12')
      Getdata.markMap(12);
    })
    $scope.$on('photo.moved_13', function(){
      // console.log('photo moved! 13')
      Getdata.markMap(13);
    })
    $scope.$on('photo.moved_14', function(){
      // console.log('photo moved! 14')
      Getdata.markMap(14);
    })
    $scope.$on('photo.moved_15', function(){
      // console.log('photo moved! 15')
      Getdata.markMap(15);
    })
    $scope.$on('photo.moved_16', function(){
      // console.log('photo moved! 16')
      Getdata.markMap(16);
    })
    $scope.$on('photo.moved_17', function(){
      // console.log('photo moved! 17')
      Getdata.markMap(17);
    })
    $scope.$on('photo.moved_18', function(){
      // console.log('photo moved! 18')
      Getdata.markMap(18);
    })
    $scope.$on('photo.moved_19', function(){
      // console.log('photo moved! 19')
      Getdata.markMap(19);
    })
    $scope.$on('photo.moved_20', function(){
      // console.log('photo moved! 20')
      Getdata.markMap(20);
    })

}