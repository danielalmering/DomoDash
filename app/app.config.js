var app = angular.module("main", ['rzModule', 'angular-carousel']);

fetchData().then(bootstrapApplication);

function fetchData() {
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");

    return $http.get("./config.json").then(function(response) {
        app.constant("CONFIG", response.data);
        app.constant("HOSTLOGIN", 'username=' + response.data.username + '&password=' + response.data.password + '&');
    }, function(errorResponse) {
        app.constant("CONFIG", undefined);
        app.constant("HOSTLOGIN", undefined);
    });
}

function bootstrapApplication() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ["main"]);
    });
}


app.config(function($sceProvider, $locationProvider) {
    $sceProvider.enabled(false);
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
