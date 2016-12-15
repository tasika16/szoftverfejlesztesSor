app.controller('DashboardController', function ($scope, $aside, $timeout, $http, $rootScope, NgMap, stopService, routeService, busService, _) {
	$rootScope.pageTitle = 'Főoldal';

	$scope.selectedOrig = null;
	$scope.selectedDest = null;

	$scope.busList = [];
	$scope.stopList = [];
	$scope.routeList = [];

	$scope.isShowStop = function (e) {
	    if (!$scope.selectedOrig && !$scope.selectedDest) {
	        return true;
	    }
	    if ($scope.selectedOrig && e.stopID == $scope.selectedOrig.originalObject.stopID) {
	        return true;
	    }
	    if ($scope.selectedDest && e.stopID == $scope.selectedDest.originalObject.stopID) {
	        return true;
	    }
	    return false;
	}

	$scope.$watch('selectedOrig', function(n, o) {
        if (n !== o) $scope.onSearchChange();
	});
	$scope.$watch('selectedDest', function(n, o) {
	    if (n !== o) $scope.onSearchChange();
	});

	var busContainsStop = function (selectedStop) {
	    var ret = [];
	    for (var i = 0; i < $scope.routeList.length; i++) {
	        var route = $scope.routeList[i];
	        if (route.stop.stopID == selectedStop.originalObject.stopID) {
	            ret.push(route.bus.lineNumber);
	        }
	    }
	    return ret;
	}

	$scope.onSearchChange = function() {
	    if ($scope.selectedOrig && $scope.selectedDest) {

	        var origRoutes = busContainsStop($scope.selectedOrig);
	        var destRoutes = busContainsStop($scope.selectedDest);

	        $scope.searchRouteInfo = []; // routes with both stop
	        _.each(origRoutes, function (line) {
	            if (destRoutes.indexOf(line) >= 0 && !_.find($scope.searchRouteInfo, function (b) { return b.lineNumber === line; })) {
	                $scope.searchRouteInfo.push(_.find($scope.busList, function (b) { return b.lineNumber === line; }));
	            }
	        });
	        showForm(searchInfoTpl);
	    }
	}

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
		vm.map.showInfoWindow('infoWindow', this);
		
		showForm(stopInfoTpl);
		
		$timeout(function(){
			$('.ng-map-info-window > div').last().click(function(){
				$scope.selectedStop = null;
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
		//showForm(busInfoTpl);
		vm.map.showInfoWindow('busWindow', this);
	}

	$scope.showBusInfo = function () {
	    showForm(busInfoTpl);
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

	var searchInfoTpl = $aside({
	    scope: $scope,
	    template: '/app/tpl/partials/searchinfo.html',
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
        hideForm(searchInfoTpl);
    });
});
