app.service('busService', function($http) {
	this.getList = function(){
		return $http.get("/Bus/List").then(function(result){
			return result.data;
		}, function(err){
			console.error(err);
		});
	}
});
