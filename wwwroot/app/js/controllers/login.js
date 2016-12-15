app.controller('LoginController', function($window, $location, $scope, $rootScope, $interval, $http){
	$rootScope.pageTitle = 'Belépés';
    $scope.email = "";
    $scope.password = "";
    $scope.error = null;

    $scope.auth = function(){
        $scope.error = null;
        $http.post("/Home/Login", {email: $scope.email, password: $scope.password}).then(function(result){
            $rootScope.user = result.data;
            $location.path("/admin/stops");
        }, function(result){
            $scope.error = result.data.error;
            console.error($scope.error);
        });
    }
});