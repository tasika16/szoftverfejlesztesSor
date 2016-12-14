app.controller('DashboardController', function ($scope, $aside, $timeout, $http, $rootScope, NgMap, stopService, routeService, busService, _) {
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
	        var bus = _.find($scope.busList, {lineNumber: s.lineNumber});
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
	    _.each($scope.routeList, function (route) {
	        route.bus = _.findWhere($scope.busList, {"busID": route.busRefId});
	    });
	    _.each($scope.stopList, function (stop) {
	        stop.routes = _.where($scope.routeList, {"stopRefId": stop.stopID});
	    });
		_.each($scope.busList, function (b) {
			b.routes = _.where($scope.routeList, {"busRefId": b.busID});
			_.each(b.routes, function (r) {
				r.stop = _.findWhere($scope.stopList, {"stopID": r.stopRefId});
			});
		});
	});

	$scope.busRefToBus = function(id){
		return _.findWhere($scope.busList, {"busID": id});
	}

    //MAP
	var vm = this;
	NgMap.getMap("mainMap").then(function (map) {
	    vm.map = map;
	});

	$scope.selectStop = function(event, stop) {
	    $scope.selectedStop = stop;
	    $scope.searchText = stop.name;
		vm.map.showInfoWindow('infoWindow', this);
		
		showForm(stopInfoTpl);
		
		$timeout(function(){
			$('.ng-map-info-window > div').last().click(function(){
				$scope.selectedStop = null;
				$scope.searchText = '';
				$scope.$apply();
			});
		},300);
	}

	$scope.drawPath = [[0,0],[0,0]];
	$scope.selectBus = function(event, bus) {
		$scope.selectedBus = bus;
		$scope.selectedBus.routes = angular.copy(bus.routes);

		$scope.drawPath = angular.copy($scope.selectedBus.path);
/*
		var pathString = '';
		_.each($scope.selectedBus.routes, function(r){
			pathString+= "|"+r.stop.gpsLat +","+ r.stop.gpsLong;
		});
		pathString = pathString.substring(1);
/*
		routeService.snapToRoads(pathString).then(function(result){
			$scope.drawPath = [];
			_.each(result.data.snappedPoints, function(point) {
				$scope.drawPath.push([point.location.latitude, point.location.longitude]);
			});
			$scope.warningMessage = result.data.warningMessage;
		});*/
		showForm(busInfoTpl);
		vm.map.showInfoWindow('busWindow', this);
	}

	$scope.selectTime = function(bus,time){
		$scope.selectedTime = time;
	}
	$scope.calcTime = function(bus, route) {
		var value = 0;
		for(var i=0;i<bus.routes.length;i++) {
			value += bus.routes[i].travelTime;
			if (bus.routes[i].stopRefId === route.stopRefId) {
				break;
			}
		}
		return value;
	}

	var formatNiceTime = function(hours,mins){
		var tmp = Math.floor(mins/60.0);
		if (tmp > 0) {
			hours+=tmp;
			hours = hours % 24;
			mins = mins % 60;
		}
		return ((hours < 10) ? '0'+hours:hours) + ':' + ((mins < 10) ? '0'+mins:mins);
	} 

	$scope.calcTimeSelected = function(bus, route, time) {
		if (!$scope.selectedTime && !time) { return ''; };
		var hours = (time) ? time.hour : $scope.selectedTime.hour;
		var mins = (time) ? time.min : $scope.selectedTime.min;

		var value = 0;
		for(var i=0;i<bus.routes.length;i++) {
			value += bus.routes[i].travelTime;
			if (bus.routes[i].stopRefId === route.stopRefId) {
				break;
			}
		}
		mins+=value;
		return formatNiceTime(hours,mins);
	}

	$scope.calcStopTime = function(route) {
		var bus = $scope.busRefToBus(route.busRefId);
		var times = [];
		_.each(bus.starts, function(time){
			times.push($scope.calcTimeSelected(bus, route, time));			
		});
		return times;
	}
	var busInfoTpl = $aside({
        scope: $scope,
        template: '/app/tpl/partials/businfo.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-left'
    });

	var stopInfoTpl = $aside({
        scope: $scope,
        template: '/app/tpl/partials/stopinfo.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-left'
    });

    var showForm = function(tpl){
        angular.element('.tooltip').remove();
        tpl.$promise.then(function(){ tpl.show(); });
    };

    var hideForm = function(tpl){
        tpl.hide();
    };
    
    $scope.$on('$destroy', function() {
        hideForm(busInfoTpl);
        hideForm(stopInfoTpl);
    });
});
