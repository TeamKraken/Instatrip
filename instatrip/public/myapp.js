
var app = angular.module('instatrip', [
    'ui.router',
    'instatrip.services'
    ]);

app.config(function($stateProvider, $urlRouterProvider) {
    // if url not landing or display, show landing page
    $urlRouterProvider.otherwise('/landing');
    
    $stateProvider
        
        // Initial view for taking starting points and destination  ========================================
        .state('landing', {
            url: '/landing',
            templateUrl: 'landing.html'
            
        })
        
        // The view showing map and photos =================================
        .state('display', {
            url: '/display',
            templateUrl: 'display.html',
            controller: function($scope, Getdata){
                $scope.getmap = Getdata.getmap;
                $scope.test = 3;
            }
        });
        
});
