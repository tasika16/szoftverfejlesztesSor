app.controller('AdminRouteController', function($scope, $rootScope, $http, routeService){
	$rootScope.pageTitle = 'Útvonalak';
    $scope.error = null;
	$scope.routeList = [];

    $scope.getRouteList = function(){
        routeService.getList().then(function(result){
            $scope.routeList = result;
        });
    }
    $scope.getRouteList();
});