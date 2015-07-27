angular
  .module('instatrip')
  .config(function($stateProvider, $urlRouterProvider) {
    // if url not landing or display, show landing page
    $urlRouterProvider.otherwise('/landing');

    $stateProvider

        // Initial view for taking starting points and destination  ========================================
        .state('landing', {
            url: '/landing',
            templateUrl: 'partials/landing.html',
            controller: 'mainCtrl',
            directive:'ngAutocomplete'
        })

        // The view showing map and photos =================================
        .state('display', {
            url: '/display',
            templateUrl: 'partials/display.html',
            controller: 'mapCtrl'
        })

        .state('display.pics', {
            url: '/pics',
            templateUrl: 'partials/display.pics.html',
            controller: 'picsCtrl'
        });

  });