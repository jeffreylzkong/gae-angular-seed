angular.module('myApp.controllers', ['myApp.services'])

.controller('RootCtrl', function($scope, $rootScope, $modal, $localStorage, SiteContent, scrollServices){
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

    $scope.openServiceModal = function (serviceId) {

      var modalInstance = $modal.open({
        templateUrl: 'partials/service_detail.html',
        controller: 'ServiceModalInstanceCtrl',
        size: 'lg',
        resolve: {
          service: function () {
            return SiteContent.serviceDetail(serviceId);
          }
        }
      });
    };

    $rootScope.openEstimateModal = function () {

      var modalInstance = $modal.open({
        templateUrl: 'partials/estimate_detail.html',
        controller: 'EstimateModalInstanceCtrl',
        size: 'lg',
      });
    };

    $scope.scrollToTop = function(){
      scrollServices.scrollTop();
    }
})

.controller('ServiceModalInstanceCtrl', function ($scope, $rootScope, $localStorage, $modalInstance, service) {
  $scope.language = $localStorage.language;
  $scope.service = service;
/*
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
*/
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  $rootScope.$on('languageChanged', function(event, data){
    $scope.language = data;
  });
})

.controller('EstimateModalInstanceCtrl', function ($scope, $rootScope, $localStorage, $modalInstance) {
  $scope.language = $localStorage.language;
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  }
  $rootScope.$on('languageChanged', function(event, data){
    $scope.language = data;
  });
})

.controller('HeaderCtrl', function($scope){})
.controller('FooterCtrl', function($scope){})
.controller('HomeCtrl', function($scope, $rootScope, $localStorage, scrollServices, SiteContent){
    $scope.language = $localStorage.language;
    $scope.slides = SiteContent.slides;
    $scope.serviceHighlight = SiteContent.serviceHighlight;
    $scope.projectHighlight = SiteContent.projectHighlight;
    $rootScope.$on('languageChanged', function(event, data){
      $scope.language = data;
    });
    scrollServices.scrollTop();
})
.controller('ServicesCtrl', function($scope, $rootScope, $localStorage, $state, scrollServices, SiteContent){
  $scope.language = $localStorage.language;
  $scope.category = $state.params.category;
  if (!$scope.category || ['residential', 'commercial'].indexOf($scope.category) < 0) {
    $state.go('root.services', {category: 'commercial'});
  }
  $scope.categoryCfg = SiteContent.serviceCategories[$scope.category];
  $scope.services = SiteContent.services($scope.category);
  scrollServices.scrollTop();
  $rootScope.$on('languageChanged', function(event, data){
      $scope.language = data;
    });
})
.controller('ProjectsCtrl', function($scope, scrollServices, SiteContent){
    $scope.projectSummary = SiteContent.projectSummary;
    scrollServices.scrollTop();
    // TODO: to be deleted, just for Jasmine
    //$scope.openServiceModal('touchOn');
})

.controller('ProjectDetailCtrl', function($scope, $state, scrollServices, SiteContent){
    var projectId = $state.params.projectId;
    $scope.project = SiteContent.projectDetail(projectId);
    scrollServices.scrollTop();
})
/*
.controller('ChatCtrl', function($scope, $timeout, $localStorage, MockService){
      // mock acquiring data via $stateParams
    $scope.toUser = {
      _id: '534b8e5aaa5e7afc1b23e69b',
      pic: 'http://ionicframework.com/img/docs/venkman.jpg',
      username: 'Venkman'
    }

    // this could be on $rootScope rather than in $stateParams
    $scope.user = {
      _id: '534b8fb2aa5e7afc1b23e69c',
      pic: 'http://ionicframework.com/img/docs/mcfly.jpg',
      username: 'Marty'
    };

    $scope.input = {
      message: $localStorage['userMessage-' + $scope.toUser._id] || ''
    };

    var chatStatus = 0; //0: stopped, 1: starting, 2, started, 
    $scope.isCollapsed = false;

    var startChat = function() {
      chatStatus = 1;
      console.log('Chat is starting...');

      getMessages();
      
      $timeout(function() {
        chatStatus = 2;
        //footerBar = document.body.querySelector('#userMessagesView .bar-footer');
        //scroller = document.body.querySelector('#userMessagesView .scroll-content');
        //txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);

    };

    $scope.$watch('isCollapsed', function(newVal){
      if (chatStatus === 0 && newVal) {
        startChat();
      }
    })
*/    
/*
    $scope.$on('$ionicView.leave', function() {
      console.log('leaving UserMessages view, destroying interval');
      // Make sure that the interval is destroyed
      if (angular.isDefined(messageCheckTimer)) {
        $interval.cancel(messageCheckTimer);
        messageCheckTimer = undefined;
      }
    });

    $scope.$on('$ionicView.beforeLeave', function() {
      if (!$scope.input.message || $scope.input.message === '') {
        localStorage.removeItem('userMessage-' + $scope.toUser._id);
      }
    });
*/
/*
    function getMessages() {
      // the service is mock but you would probably pass the toUser's GUID here
      MockService.getUserMessages({
        toUserId: $scope.toUser._id
      }).then(function(data) {
        $scope.doneLoading = true;
        $scope.messages = data.messages;

        $timeout(function() {
          //viewScroll.scrollBottom();
        }, 0);
      });
    }

    $scope.$watch('input.message', function(newValue, oldValue) {
      console.log('input.message $watch, newValue ' + newValue);
      if (!newValue) newValue = '';
      localStorage['userMessage-' + $scope.toUser._id] = newValue;
    });

    $scope.sendMessage = function(sendMessageForm) {
      var message = {
        toId: $scope.toUser._id,
        text: $scope.input.message
      };
      
      //MockService.sendMessage(message).then(function(data) {
      $scope.input.message = '';

      message._id = new Date().getTime(); // :~)
      message.date = new Date();
      message.username = $scope.user.username;
      message.userId = $scope.user._id;
      message.pic = $scope.user.picture;

      $scope.messages.push(message);

      $timeout(function() {
        //keepKeyboardOpen();
        //viewScroll.scrollBottom(true);
      }, 0);

      $timeout(function() {
        $scope.messages.push(MockService.getMockMessage());
        //keepKeyboardOpen();
        //viewScroll.scrollBottom(true);
      }, 2000);

      //});
    };

});
*/