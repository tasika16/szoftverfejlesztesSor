app.controller('MainController', ['$scope', '$animate', 'localStorageService', '$alert', '$timeout', function($scope, $animate, localStorageService, $alert, $timeout){
    if (typeof(browser_old) == "undefined"){
        initRipplesWithArrive();

        $(document).arrive('.navbar-toggle', function() {
            $(this).sideNav({menuWidth: 260, closeOnClick: true});
        });
    }

    $scope.theme_colors = [
        'pink','red','purple','indigo','blue',
        'light-blue','cyan','teal','green','light-green',
        'lime','yellow','amber','orange','deep-orange'
    ];

    if ( !localStorageService.get('theme') ) {
        theme = {
            color: 'theme-pink',
            template: 'theme-template-dark'
        };
        localStorageService.set('theme', theme);
    }
    localStorageService.bind($scope, 'theme');

    webSocket = new WebSocket("ws://localhost:5000/ws");
    webSocket.onopen = function () {
        console.log("connected");
    };
    webSocket.onmessage = function (event) {
        console.log(event.data);
    };
    webSocket.onerror = function (event) {
        alert(event.message);
    };
    webSocket.onclose = function () {
         console.log("disconnected");
    };
}]);
