app.service('stopService', function($http) {
	this.getList = function(){
		return $http.get("/Stop/List").then(function(result){
			return result.data;
		}, function(err){
			console.error(err);
		});
	}
});
