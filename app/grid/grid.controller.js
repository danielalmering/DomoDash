function GridController($rootScope, devicesService, HOSTLOGIN) {

    var vm                = this;

    activate();

    ///////////////////////////////

    function activate(){
        initDevices();
    }

    //// Public interface

    function initDevices(){
        devicesService.get(true);
    }

    //// Update

    $rootScope.$on('$reload', function (event, data) {
        devicesService.get(true);
    });


}

angular.module('main').controller('GridController', GridController);
