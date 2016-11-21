app.service('userService', function($http) {
	this.getList = function(){
		return $http.get("/User/List").then(function(result){
			return result.data;
		}, function(err){
			console.error(err);
		});
	}
});
