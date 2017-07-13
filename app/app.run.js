angular.module("main").run(function($interval, $rootScope, devicesService, CONFIG, HOSTLOGIN){

    $rootScope.load = false;

    if(CONFIG != undefined && CONFIG.refresh != undefined){
        var resfresh = CONFIG.refresh;
    } else {
        var resfresh = 5000;
    }

    if(CONFIG != undefined && CONFIG.bgimages != undefined){
        var bgimages = CONFIG.bgimages;
        $rootScope.background = CONFIG.bgimages;
    } else {
        var bgimages = 1;
        $rootScope.background = 1;
    }

    if(CONFIG != undefined
        && CONFIG.hostname
        && HOSTLOGIN != undefined
        && CONFIG.refresh != undefined
        && CONFIG.password
        && CONFIG.username){
        $rootScope.load = true;

        var polling = $interval(function() {
            $rootScope.background = Math.floor(Math.random() * bgimages) + 1  ;
            $rootScope.$broadcast('$reload');
        }, resfresh);
    }

});
