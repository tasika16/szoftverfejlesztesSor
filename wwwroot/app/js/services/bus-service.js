app.service('busService', function($http) {
	this.getList = function(){
		return $http.get("/Bus/List").then(function(result){
			return result.data;
		}, function(err){
			console.error(err);
			return [
				{id: 1, name: "1-es busz", gps_lat: 47.0923658, gps_long: 17.9123803 },
				{id: 2, name: "2-es busz", gps_lat: 47.0429658, gps_long: 17.9126843 },
				{id: 3, name: "3-as busz", gps_lat: 47.0929658, gps_long: 17.9175883 },
				{id: 4, name: "4-es busz", gps_lat: 47.0957758, gps_long: 17.9127893 },
				{id: 5, name: "5-ös busz", gps_lat: 47.0967658, gps_long: 17.9136893 },
			];
		});
	}
});
