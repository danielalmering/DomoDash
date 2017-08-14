angular.module("main").run(function($interval, $rootScope, devicesService, CONFIG, HOSTLOGIN){

    $rootScope.load = false;

    if(CONFIG != undefined && CONFIG.refresh != undefined){
        var refresh = CONFIG.refresh;
    } else {
        var refresh = 5000;
    }


    if(CONFIG != undefined && CONFIG.hostname){
        $rootScope.load = true;

        var polling = $interval(function() {
            $rootScope.$broadcast('$reload');
        }, refresh);
    }

});
