var app = angular.module("main", []);

fetchData().then(bootstrapApplication);

function fetchData() {
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");

    return $http.get("config.json").then(function(response) {
        app.constant("CONFIG", response.data);
        app.constant("HOSTLOGIN", 'username=' + response.data.USERNAME + '&password=' + response.data.PASSWORD + '&');
    }, function(errorResponse) {
        app.constant("CONFIG", undefined);
    });
}

function bootstrapApplication() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ["main"]);
    });
}
