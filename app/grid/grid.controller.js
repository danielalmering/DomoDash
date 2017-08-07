function GridController($rootScope, devicesService, CONFIG, HOSTLOGIN) {

    var vm                = this;
    vm.gotDevices         = false;
    vm.blocks             = CONFIG.blocks;

    activate();

    ///////////////////////////////

    function activate(){
        gotDevices();
        initDevices();
    }

    //// Public interface

    function gotDevices(){
        if(vm.blocks){
            angular.forEach(vm.blocks, function(value, key) {
                if(value.type.match("Device")){
                    vm.gotDevices = true;
                }
            });
        }
    }

    function initDevices(){
        if(vm.gotDevices === true){
            devicesService.get(true);
        }
    }

    //// Update

    $rootScope.$on('$reload', function (event, data) {
        if(vm.gotDevices === true){
            devicesService.get(true);
        }
    });


}

angular.module('main').controller('GridController', GridController);
