var app = angular.module("main", ['ab-base64']);

app.run(function($interval, $rootScope, CONFIG, HOSTLOGIN){

    if(CONFIG === undefined){
        $rootScope.load = false;
        var resfresh = 5000;
        var bgimages = 1;
        $rootScope.background = 1;
    } else {
        $rootScope.load = true;
        var resfresh = CONFIG.REFRESH;
        var bgimages = CONFIG.BGIMAGES;
        $rootScope.background = CONFIG.BGIMAGES;
    }

    var polling = $interval(function() {
        $rootScope.background = Math.floor(Math.random() * bgimages) + 1  ;
        $rootScope.$broadcast('$reload');
    }, resfresh);
});
