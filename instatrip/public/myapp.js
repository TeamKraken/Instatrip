
var app = angular.module('instatrip', [
    'ui.router'
    ]);

app.config(function($stateProvider, $urlRouterProvider) {
    // if url not landing or display, show landing page
    $urlRouterProvider.otherwise('/landing');
    
    $stateProvider
        
        // Initial view for taking starting points and destination  ========================================
        .state('landing', {
            url: '/landing',
            templateUrl: 'landing.html',
            controller: function($scope){
                // $scope.getmap = Getdata.getmap;
                $scope.test = 3;
            }
        })
        
        // The view showing map and photos =================================
        .state('display', {
            url: '/display',
            templateUrl: 'display.html'
        });
        
});
