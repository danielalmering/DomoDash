function GarbageController($scope, $rootScope, $http, CONFIG, $timeout) {

    var vm                = this;
    vm.homenummer         = CONFIG.garbage_homenr;
    vm.zipcode            = CONFIG.garbage_zipcode;
    vm.garbagedata        = {};

    vm.garbageapp         = ['recyclemanager'];

    if(CONFIG.garbage_homenr && CONFIG.garbage_zipcode){
        getGarbage();
    }

    //// Public interface

    function getGarbage(){

        recyclemanager();
        
    }

    function recyclemanager(){
        $http.get('https://vpn-wec-api.recyclemanager.nl/v2/calendars?postalcode=' + vm.zipcode + '&number=' + vm.homenummer + '&mode=queue').then(function(res) {
            console.log(res.data.data);
            vm.garbagedata = res.data.data;
        });
    }


    //// Update

    $rootScope.$on('$reload', function (event, data) {

    });

}

angular.module('main').controller('GarbageController', GarbageController);
