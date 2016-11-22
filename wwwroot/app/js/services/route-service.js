app.service('routeService', function($http) {
	this.getList = function(){
		return $http.get("/Route/List").then(function(result){
			return result.data;
		}, function(err){
			console.error(err);
		});
	}
	this.snapToRoads = function(pathString){
		return $http.get("https://roads.googleapis.com/v1/snapToRoads?path="+pathString+"&interpolate=true&key=AIzaSyAVV1W1PWhePwjY92Kth3KoV9d9R8lB21Q")
	}

	Math.radians = function(degrees) {
		return degrees * Math.PI / 180;
	};
	Math.degrees = function(radians) {
		return radians * 180 / Math.PI;
	};

	this.closestStop = function(bus){
		var closestStop = bus.routes[0].stop;
		var distance = 99999999;
		_.each(bus.routes, function(r){
			startLat = Math.radians(bus.gpsLat);
			startLong = Math.radians(bus.gpsLong);
			endLat = Math.radians(r.stop.gpsLat);
			endLong = Math.radians(r.stop.gpsLong);
			dLong = endLong - startLong;
			dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0))
			if (Math.abs(dLong) > Math.PI) {
				if (dLong > 0.0) {
					dLong = -(2.0 * Math.PI - dLong);
				} else{
					dLong = (2.0 * Math.PI + dLong);
				}
			}
			var d = (Math.degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
			if (d < distance) {
				distance = d;
				closestStop = r.stop;
			}
		});
		console.log("closest stop in route ["+distance+"]:" + closestStop.name)
		return closestStop;
	}

});
