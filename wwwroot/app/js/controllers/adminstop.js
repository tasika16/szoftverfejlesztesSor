app.controller('AdminStopController', function($location, $timeout, $scope, $rootScope, $http, $aside, stopService, NgMap){
	$rootScope.pageTitle = 'Megállók';
    $scope.error = null;
	
	$scope.stopList = [];

    $scope.getStopList = function(){
       stopService.getList().then(function(result){
            $scope.stopList = result;
        });
    }
    $scope.getStopList();

    $scope.removeItem = function(item){
        $scope.stopList = _.reject($scope.stopList, function (curr) { return item.stopID === curr.stopID });
        $http.post("/Stop/Remove/" + item.stopID, { id: item.stopID }).then(function (result) {
            
        }, function(result){
            $scope.error = result.data.error;
            console.error(result);
        });
    }

    $scope.saveItem = function(){
        $http.post("/Stop/Edit", $scope.editedItem).then(function(result){
            $scope.getStopList();
            hideForm();
        }, function(result){
            $scope.error = result.data.error;
            console.error(result);
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
        template: '/app/tpl/admin/stops-edit.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-left'
    });

    var showForm = function(){
        angular.element('.tooltip').remove();
        formTpl.$promise.then(function(){ formTpl.show(); });
        //hack but it works
        $timeout(function(){
            $scope.showmap = true;
        }, 500);
    };

    var hideForm = function(){
        $scope.showmap = false;
        formTpl.hide();
    };
    
    $scope.$on('$destroy', function() {
        hideForm();
    });

    //MAP
    var vm = this;
    NgMap.getMap("stopMap").then(function(map) {
      vm.map = map;
    });
    $scope.placeMarker = function(e) {
      $scope.editedItem.gpsLat = e.latLng.lat();
      $scope.editedItem.gpsLong = e.latLng.lng();
    }
});