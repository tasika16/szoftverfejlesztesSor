app.controller('AdminBusController', function($location, $scope, $rootScope, $http, $aside, busService){
	$rootScope.pageTitle = 'Buszok';
    $scope.error = null;
	$scope.busList = [];

    $scope.getBusList = function(){
        busService.getList().then(function(result){
            $scope.busList = result;
        });
    }
    $scope.getBusList();

    $scope.removeItem = function(item){
        $scope.busList = _.reject($scope.busList, function(curr){ return item.id === curr.id });
        $http.post("/Bus/Remove/"+item.id, {id: item.id}).then(function(result){
            
        }, function(result){
            $scope.error = result.data.error;
            console.error($scope.error);
        });
    }

    $scope.saveItem = function(){
        $http.post("/Bus/Edit", $scope.editedItem).then(function(result){
            $scope.getBusList();
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
        template: '/public/app/tpl/admin/buses-edit.html',
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