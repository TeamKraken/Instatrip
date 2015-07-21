
var app = angular.module('instatrip', [
    'ui.router',
    'instatrip.services',
    'ngScrollbar'
    ]);

app.config(function($stateProvider, $urlRouterProvider) {
    // if url not landing or display, show landing page
    $urlRouterProvider.otherwise('/landing');
    
    $stateProvider
        
        // Initial view for taking starting points and destination  ========================================
        .state('landing', {
            url: '/landing',
            templateUrl: 'landing.html',
            controller: 'mainCtrl',
            directive:'ngAutocomplete'
        })
        
        // The view showing map and photos =================================
        .state('display', {
            url: '/display',
            templateUrl: 'display.html',
            resolve: {

            },
            controller: 'mainCtrl'
        })

        .state('display.pics', {
            url: '/pics',
            templateUrl: 'display.pics.html',
            controller: 'mainCtrl'
        })
        ;
        
});

app.controller('mainCtrl',['$scope', 'Getdata', '$rootScope', function( $scope,Getdata, $rootScope){
    $scope.getmap = Getdata.getmap;
    $scope.test = ["https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11249073_1015138105187836_1259996586_n.jpg",
                  "https://scontent.cdninstagram.com/hphotos-xpa1/t51.2885-15/s320x320/e15/923726_1671559049744998_164329585_n.jpg",
                  "https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s320x320/e15/11420453_439166169602750_25598530_n.jpg"];

    $rootScope.$on("$stateChangeStart", function (event){
      console.log('Initializing map..')
      setTimeout($scope.makeMap, 50);
      // setTimeout($scope.changeImage, 1000);
      $scope.changeImage();


    })
    $scope.displayAll = function(){
      $scope.makeMap();
      $scope.changeImage();
    }

    $scope.setScope = function(start, end, method){
      $rootScope.start = start;
      $rootScope.end = end;
      $rootScope.method = method || 'DRIVING'
    }

    $scope.makeMap = function(){
      console.log('Map loaded')
      Getdata.getmap($rootScope.start, $rootScope.end, $rootScope.travelMethod);
    }

    // $scope.imgUrl = "http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg";
    $scope.changeImage = function(){
      console.log('Loading images...');
      // $scope.imgUrl = Getdata.getCurrentImg();
      // $scope.secondImgUrl = Getdata.getSecondImg();
      $scope.imgs = Getdata.getImages();
      $scope.$broadcast('rebuild:me'); 
    };

    $scope.$on('scrollbar.show', function(){
      console.log('Scrollbar show');
    });

    $scope.$on('scrollbar.hide', function(){
      console.log('Scrollbar hide');
    });
     // rebuild the scrollbar

}])




app.directive('ngAutocomplete', function() {
    return {
      require: 'ngModel',
      scope: {
        ngModel: '=',
        options: '=?',
        details: '=?'
      },

      link: function(scope, element, attrs, controller) {

        //options for autocomplete
        var opts
        var watchEnter = false
        //convert options provided to opts
        var initOpts = function() {

          opts = {}
          if (scope.options) {

            if (scope.options.watchEnter !== true) {
              watchEnter = false
            } else {
              watchEnter = true
            }

            if (scope.options.types) {
              opts.types = []
              opts.types.push(scope.options.types)
              scope.gPlace.setTypes(opts.types)
            } else {
              scope.gPlace.setTypes([])
            }

            if (scope.options.bounds) {
              opts.bounds = scope.options.bounds
              scope.gPlace.setBounds(opts.bounds)
            } else {
              scope.gPlace.setBounds(null)
            }

            if (scope.options.country) {
              opts.componentRestrictions = {
                country: scope.options.country
              }
              scope.gPlace.setComponentRestrictions(opts.componentRestrictions)
            } else {
              scope.gPlace.setComponentRestrictions(null)
            }
          }
        }

        if (scope.gPlace == undefined) {
          scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
        }
        google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
          var result = scope.gPlace.getPlace();
          if (result !== undefined) {
            if (result.address_components !== undefined) {

              scope.$apply(function() {

                scope.details = result;

                controller.$setViewValue(element.val());
              });
            }
            else {
              if (watchEnter) {
                getPlace(result)
              }
            }
          }
        })

        //function to get retrieve the autocompletes first result using the AutocompleteService 
        var getPlace = function(result) {
          var autocompleteService = new google.maps.places.AutocompleteService();
          if (result.name.length > 0){
            autocompleteService.getPlacePredictions(
              {
                input: result.name,
                offset: result.name.length
              },
              function listentoresult(list, status) {
                if(list == null || list.length == 0) {

                  scope.$apply(function() {
                    scope.details = null;
                  });

                } else {
                  var placesService = new google.maps.places.PlacesService(element[0]);
                  placesService.getDetails(
                    {'reference': list[0].reference},
                    function detailsresult(detailsResult, placesServiceStatus) {

                      if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                        scope.$apply(function() {

                          controller.$setViewValue(detailsResult.formatted_address);
                          element.val(detailsResult.formatted_address);

                          scope.details = detailsResult;

                          //on focusout the value reverts, need to set it again.
                          var watchFocusOut = element.on('focusout', function(event) {
                            element.val(detailsResult.formatted_address);
                            element.unbind('focusout')
                          })

                        });
                      }
                    }
                  );
                }
              });
          }
        }

        controller.$render = function () {
          var location = controller.$viewValue;
          element.val(location);
        };

        //watch options provided to directive
        scope.watchOptions = function () {
          return scope.options
        };
        scope.$watch(scope.watchOptions, function () {
          initOpts()
        }, true);

      }
    };
  });