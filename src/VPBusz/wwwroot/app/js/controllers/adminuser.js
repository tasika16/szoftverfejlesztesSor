app.controller('AdminUserController', function($location, $scope, $rootScope, $http, $aside, userService){
	$rootScope.pageTitle = 'Felhasználók';
    $scope.error = null;
	$scope.userList = [];

    $scope.getUserList = function(){
        userService.getList().then(function(result){
            $scope.userList = result;
        });
    }
    $scope.getUserList();

    $scope.removeItem = function(item){
        $scope.userList = _.reject($scope.userList, function(curr){ return item.id === curr.id });
        $http.post("/User/Remove/"+item.id, {id: item.id}).then(function(result){
            
        }, function(result){
            $scope.error = result.data.error;
            console.error($scope.error);
        });
    }

    $scope.saveItem = function(){
        $http.post("/User/Edit", $scope.editedItem).then(function(result){
            $scope.getUserList();
            hideForm();
        }, function(result){
            $scope.error = result.data.error;
            console.error($scope.error);
        });
    }

    $scope.editItem = function(val){
        $scope.editedItem = {};
        if (val) {
            $scope.editedItem = angular.copy(val);
        }
        showForm();
    };

    var formTpl = $aside({
        scope: $scope,
        template: '/app/tpl/admin/users-edit.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-left'
    });

    var showForm = function(){
        angular.element('.tooltip').remove();
        formTpl.$promise.then(function(){ formTpl.show(); });
    };

    var hideForm = function(){
        formTpl.hide();
    };
    
    $scope.$on('$destroy', function() {
        hideForm();
    });

});