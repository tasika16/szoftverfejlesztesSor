app.controller('DashboardController', function ($scope, $timeout, $rootScope, NgMap, stopService, routeService, busService, _) {
	$rootScope.pageTitle = 'Főoldal';
	$scope.searchText = "";

	$scope.busList = [];
	busService.getList().then(function (result) {
	    $scope.busList = result;
	});


	$scope.stopList = [];
	$scope.routeList = [];
	stopService.getList().then(function (result) {
	    $scope.stopList = result;
	    return routeService.getList();
	}).then(function (result) {
	    $scope.routeList = result;
	    _.each($scope.stopList, function (stop) {
	        stop.routes = [];
	        stop.routes.push(_.filter($scope.routeList, function (item) { return item.stopRefId === stop.stopID; }))
	        if (stop.routes.length > 1) {
	            console.log(stop.routes);
	        }

	    });
	});;


    //MAP
	var vm = this;
	NgMap.getMap("mainMap").then(function (map) {
	    vm.map = map;
	});

	$scope.selectStop = function(event, stop) {
	    stop.selected = true;
	    $scope.selectedStop = stop;
	    $scope.searchText = stop.name;
		vm.map.showInfoWindow('infoWindow', this);
		$timeout(function(){
			$('.ng-map-info-window > div').last().click(function(){
				$scope.selectedStop = null;
				$scope.searchText = '';
				$scope.$apply();
			});
		},500);
	}

});
