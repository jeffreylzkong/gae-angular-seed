angular.module('myApp.controllers', ['myApp.services'])

.controller('RootCtrl', function($scope, $rootScope, $modal, $localStorage, scrollServices){
  // Site default settings
  $localStorage.$default({
    language: 'en',
  });
  // Language settings
    $scope.language = $localStorage.language;
    $scope.$watch('language', function(newVal, oldVal){
      if (newVal !== oldVal) {
        $localStorage.language = newVal;
        $rootScope.$broadcast('languageChanged', newVal);
      }
    });
    $rootScope.$on('languageChanged', function(event, data){
      $scope.language = data;
    });


    $scope.scrollToTop = function(){
      scrollServices.scrollTop();
    }
})

.controller('HomeCtrl', function($scope, $rootScope, $localStorage, scrollServices){
    $scope.language = $localStorage.language;
    scrollServices.scrollTop();
})
