function GarbageController($scope, $rootScope, $http, CONFIG, $timeout) {

    var vm                = this;
    vm.homenr             = CONFIG.garbage_homenr;
    vm.zipcode            = CONFIG.garbage_zipcode;
    vm.app                = CONFIG.garbage_app
    vm.title              = $scope.name;
    vm.garbagedata        = {};
    vm.currentyear        = new Date().getFullYear();

    if(vm.homenr && vm.zipcode && vm.app){
        getGarbage();
    }

    //// Public interface

    function getGarbage(){

        if(vm.app === 'recyclemanager'){ recyclemanager(); }
        if(vm.app === 'mijnafvalwijzer'){ mijnafvalwijzer(); }

    }

    function recyclemanager(){
        $http.get('https://vpn-wec-api.recyclemanager.nl/v2/calendars?postalcode=' + vm.zipcode + '&number=' + vm.homenr + '&mode=queue').then(function(res) {
            vm.garbagedata = res.data.data;
        });
    }

    function mijnafvalwijzer(){
        $http.get('https://cors-anywhere.herokuapp.com/http://json.mijnafvalwijzer.nl/?method=postcodecheck&postcode=' + vm.zipcode + '&street=&huisnummer=' + vm.homenr + '&toevoeging=').then(function(res) {
            vm.garbagedata = res;
            console.log(res);
        });
    }


    //// Update

    $rootScope.$on('$reload', function (event, data) {
        if(vm.homenr && vm.zipcode && vm.app){
            getGarbage();
        }
    });

}

angular.module('main').controller('GarbageController', GarbageController);
