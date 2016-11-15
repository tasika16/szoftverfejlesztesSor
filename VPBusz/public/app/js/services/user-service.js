app.service('userService', function($http) {
	this.getList = function(){
		return $http.get("/User/List").then(function(result){
			return result.data;
		}, function(err){
			console.error(err);
			return [
				{id: 1, email: "admin@localhost.dev"},
				{id: 2, email: "adsdfsdgmin@localhost.dev"},
				{id: 3, email: "dfgfdhdgmin@localhost.dev"}
			];
		});
	}
});
