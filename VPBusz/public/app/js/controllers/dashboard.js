app.controller('DashboardController', ['$window', '$scope', '$rootScope', '$interval', function($window, $scope, $rootScope, $interval){
	$rootScope.pageTitle = 'Főoldal';
	$scope.tabs = ['Log','Timeline','Messages'];
}]);
