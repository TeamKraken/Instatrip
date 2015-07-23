angular
  .module('instatrip')
  .config(function($stateProvider, $urlRouterProvider) {
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
            controller: 'picsCtrl'
        })
        ;
        
});