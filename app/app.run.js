angular.module("main").run(function($interval, $rootScope, devicesService, CONFIG, HOSTLOGIN){

    if(CONFIG === undefined){
        $rootScope.load = false;
        var resfresh = 5000;
        var bgimages = 1;
        $rootScope.background = 1;
    } else {
        $rootScope.load = true;
        var resfresh = CONFIG.refresh;
        var bgimages = CONFIG.bgimages;
        $rootScope.background = CONFIG.bgimages;
    }

    var polling = $interval(function() {
        $rootScope.background = Math.floor(Math.random() * bgimages) + 1  ;
        $rootScope.$broadcast('$reload');
    }, resfresh);

});
