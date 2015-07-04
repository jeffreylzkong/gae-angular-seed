angular.module('myApp', ['ui.router', 'ui.bootstrap', 'smoothScroll', 'ngStorage', 'ngSanitize', 'myApp.controllers', 'myApp.directives', 'myApp.filters'])

.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $state.transitionTo('root.home');
    }
  ]
)

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider
      // Root state to master all
        .state('root', {
            abstract: true,
            views: {
                'header': {
                    templateUrl: 'partials/header.html',
                    controller: 'RootCtrl'
                },
                'main': {
                    template: '<div ui-view="master"></div>',
                    controller: 'RootCtrl'
                },
                'footer': {
                    templateUrl: 'partials/footer.html',
                    controller: 'RootCtrl'
                },
            }
        })

        // Home
        .state('root.home', {
            url: '/',
            views: {
                'master@root': {
                    templateUrl: 'partials/home.html',
                    controller: 'HomeCtrl'
                }
            }
        })
    }
  ]
);

