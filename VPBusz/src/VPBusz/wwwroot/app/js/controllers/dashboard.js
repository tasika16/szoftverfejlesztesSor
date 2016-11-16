app.controller('DashboardController', function($scope, $rootScope, NgMap, stopService){
	$rootScope.pageTitle = 'Főoldal';

	$scope.stopList = [];
	stopService.getList().then(function(result){
		$scope.stopList = result;
		console.log(result);
	});
});
