// routes
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/app/tpl/dashboard.html'
  }).when('/admin', {
    templateUrl: '/app/tpl/admin/login.html'
  }).when('/:folder/:tpl', {
      templateUrl: function(attr){
        return '/app/tpl/' + attr.folder + '/' + attr.tpl + '.html';
      }
    }).when('/:tpl', {
      templateUrl: function(attr){
        return '/app/tpl/' + attr.tpl + '.html';
      }
    }).otherwise({ redirectTo: '/' });
}])
/*
// google maps
.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key',
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  });
}])

// loading bar settings
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 1;
}])

// defaults for date picker
.config(['$datepickerProvider', function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd/MM/yyyy',
    iconLeft: 'md md-chevron-left',
    iconRight: 'md md-chevron-right',
    autoclose: true,
  });
}])

// defaults for date picker
.config(['$timepickerProvider', function($timepickerProvider) {
  angular.extend($timepickerProvider.defaults, {
    timeFormat: 'HH:mm',
    iconUp: 'md md-expand-less',
    iconDown: 'md md-expand-more',
    hourStep: 1,
    minuteStep: 1,
    arrowBehavior: 'picker'
  });
}])

// disable nganimate with adding class
.config(['$animateProvider', function($animateProvider) {
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
}])
*/
// set constants
.run(['$rootScope', 'APP', function ($rootScope, APP) {
    $rootScope.APP = APP;
}]);
