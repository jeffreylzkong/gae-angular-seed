angular.module('myApp.directives', [])

.directive('weatherBar', function($http, $rootScope, $localStorage, $state){
    return {
        restrict: 'E',
        template: '<div id="weatherBar">' +
                    '<table class="table table-bordered">' +
                      '<tbody>' +
                        '<tr id="dates"><th ng-repeat="date in dates">{{date[0] | translate: this}}</br><span class="date">{{date[1]}}</span></th></tr>' +
                        '<tr id="weather"> <th ng-repeat="weather in weathers track by $index"><img ng-src="{{weather}}"></th></tr>' +
                        '<tr id="services"> <td ng-repeat="service in services track by $index" colspan={{service[0]}} class="project_service {{service[1]}}" ng-click="serviceHandler(service[1])">{{service[2] | translate: this}}</td></tr>' +
                      '</tbody>' +
                    '</table>' +
                  '</div>',
        link: function (scope, element) {
            // Weather bar
          /*[{"data":
           *    {"pop": 55.00000000000001,
           *     "icon": "partly-cloudy-day",
           *     "summary": "Mostly cloudy throughout the day.",
           *     "temperatureMax": 18.78,
           *     "windSpeed": 4.3,
           *     "temperatureMin": 13.06,
           *     "services": ["roof_repair"]
           *    },
           *  "day":
           *    {
           *     "weekday": "Thursday",
           *     "date": "14-07-03"
           *    }
           * },
           * ...
           *]
           *
           * */
          scope.language = $localStorage.language;
          scope.dates = [];
          scope.weathers = [];
          scope.services = [];
          var tr_services_temp = [];
          var short_weekdays = [ "SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];
          var formatted_month = function(d) { return (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1); };
          var formatted_day = function(d) { return (d.getDate() < 10 ? '0' : '') + d.getDate(); };
          var service_duration = {
            "roof_repair": 3,
            "gutter_fix": 1,
            "inspection": 1,
            "default_service": 1
          };
          var service_name = {
            'roof_repair': {en: "Repairing Roof", zhs: '屋顶重装或大修', zht: '屋頂重裝或大修'},
            'gutter_fix': {en: "Gutter Maintenance", zhs: '排水沟修护', zht: '排水溝修護'},
            'inspection': {en: "Project Inspection", zhs: '免费咨询', zht: '免費諮詢'},
            'default_service': {en: "Repair and Maintenance", zhs: '日常维修', zht: '日常維修'}
          };
          scope.serviceHandler = function(s){
            if (s === 'inspection') {
              $rootScope.openEstimateModal();
            } else {
              $state.go('root.services');
            }
          };

          $http.get( "http://jingweather.appspot.com/api/helios")
            .success(function(data) {
                data.forEach(function(w, i){
                    // tr_dates
                    var d = new Date(w.day.date);
                    scope.dates.push([short_weekdays[d.getDay()], formatted_month(d)+'/'+formatted_day(d)]);
                    // tr_weather
                    scope.weathers.push("/static/img/"+w.data.icon+".png");
                    // tr_services
                    tr_services_temp.push(w.data.services[0] || "default_service");
                });
            //tr_services
            var c = 0; //counter
            tr_services_temp.forEach(function(s,i){
                if (c === 0) {
                   scope.services.push([service_duration[s], s, service_name[s]]);
                   c = service_duration[s]-1;
                  } else {
                    --c;
                  }
                });

          });

          $rootScope.$on('languageChanged', function(event, data){
            scope.language = data;
          });
        }
    }
})
