var app = angular.module("main", ['ngAnimate', 'rzModule', 'angular-carousel']);

fetchData().then(bootstrapApplication);

function fetchData() {
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");

    return $http.get("./config.json").then(function(res) {
        app.constant("CONFIG", res.data);
        if(res.data.username && res.data.password){
            app.constant("HOSTLOGIN", 'username=' + res.data.username + '&password=' + res.data.password + '&');
        } else {
            app.constant("HOSTLOGIN", undefined);
        }
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


app.config(function($sceProvider, $locationProvider, $compileProvider, $animateProvider) {
    $animateProvider.classNameFilter(/angular-animate/);
    $sceProvider.enabled(false);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
