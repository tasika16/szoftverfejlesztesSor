app.service('routeService', function($http) {
	this.getList = function(){
		return $http.get("/Route/List").then(function(result){
			return result.data;
		}, function(err){
			console.error(err);
		});
	}
});
