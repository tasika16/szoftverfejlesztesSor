app.service('stopService', function($http) {
	this.getList = function(){
		return $http.get("/Stop/List").then(function(result){
			return result.data;
		}, function(err){
			console.error(err);
			return [
				{id: 1, name: "megálló1", gps_lat: 47.0923658, gps_long: 17.9123803 },
				{id: 2, name: "megálló2", gps_lat: 47.0426658, gps_long: 17.9124843 },
				{id: 3, name: "megálló3", gps_lat: 47.0925658, gps_long: 17.9174883 },
				{id: 4, name: "megálló4", gps_lat: 47.0954658, gps_long: 17.9126893 },
				{id: 5, name: "megálló5", gps_lat: 47.0967658, gps_long: 17.9136893 },
			];
		});
	}
});
