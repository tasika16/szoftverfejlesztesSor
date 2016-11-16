app.service('routeService', function($http) {
	this.getList = function(){
		return $http.get("/Route/List").then(function(result){
			return result.data;
		}, function(err){
			console.error(err);
			return [
				{id: 1},
				{id: 2},
				{id: 3}
			];
		});
	}
});
