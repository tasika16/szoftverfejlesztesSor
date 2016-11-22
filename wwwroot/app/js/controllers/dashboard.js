app.controller('DashboardController', function ($scope, $aside, $timeout, $rootScope, NgMap, stopService, routeService, busService, _) {
	$rootScope.pageTitle = 'Főoldal';
	$scope.searchText = "";

	$scope.busList = [];
	$scope.stopList = [];
	$scope.routeList = [];

	busService.getList().then(function (result) {
	    $scope.busList = result;
		return busService.getStartList();
	}).then(function (result) {
	    _.each(result, function (s) {
	        var bus = _.find($scope.busList, {lineNumber: s.lineNumber})
			if (!bus.starts) {
				bus.starts = [];
			}
			bus.starts.push(s);
	    });
		return stopService.getList();	
	}).then(function (result) {
	    $scope.stopList = result;
	    return routeService.getList();
	}).then(function (result) {
	    $scope.routeList = result;
	    _.each($scope.stopList, function (stop) {
	        stop.routes = [];
	        stop.routes.push(_.where($scope.routeList, {"stopRefId": stop.stopID}));
	        if (stop.routes.length > 1) {
	            console.log(stop.routes);
	        }
	    });
		_.each($scope.busList, function (b) {
			b.routes = _.where($scope.routeList, {"busRefId": b.lineNumber});
			_.each(b.routes, function (r) {
				r.stop = _.findWhere($scope.stopList, {"stopID": r.stopRefId});
			});
		});
	});


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

	$scope.drawPath = [[0,0],[47.0933533,17.9245453]];
	$scope.selectBus = function(event, bus) {
		$scope.selectedBus = bus;
		console.log($scope.selectedBus);
		$scope.selectedBus.routes = angular.copy(bus.routes);
		$scope.selectedBusRoutes = $scope.selectedBus.routes;

		$scope.drawPath = [];
		_.each($scope.selectedBus.routes, function(r){
			$scope.drawPath.push([r.stop.gpsLat, r.stop.gpsLong]);
		});
		console.log($scope.drawPath);
		showForm();
		vm.map.showInfoWindow('busWindow', this);
	}

	var formTpl = $aside({
        scope: $scope,
        template: '/app/tpl/partials/businfo.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-left'
    });

    var showForm = function(){
        angular.element('.tooltip').remove();
        formTpl.$promise.then(function(){ formTpl.show(); });
    };

    var hideForm = function(){
        formTpl.hide();
    };
    
    $scope.$on('$destroy', function() {
        hideForm();
    });
});
