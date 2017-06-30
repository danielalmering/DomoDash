function SwitchesController($scope, $rootScope, $http, CONFIG, HOSTLOGIN) {

    var vm                = this;
    vm.switches           = [];
    vm.switchDevice       = switchDevice;
    vm.render             = false;

    activate();

    ///////////////////////////////

    function activate(){
        getSwitches();
    }

    //// Public interface

    function getSwitches(){
        $http.get(CONFIG.HOSTNAME + '/json.htm?' + HOSTLOGIN + 'type=devices&filter=light&used=true&order=Name').then(function(res) {
            vm.switches = res.data.result;
        });
    }

    function switchDevice(device){

        if(device.Status === 'Off'){
            var status = 'On';
        } else {
            var status = 'Off';
        }

        $http.get(CONFIG.HOSTNAME + '/json.htm?' + HOSTLOGIN + 'type=command&param=switchlight&idx=' + device.idx + '&switchcmd=' + status).then(function() {
            getSwitches();
        });
    }

    //// Update

    $rootScope.$on('$reload', function (event, data) {
        getSwitches();
    });

    angular.element(document).ready(function() {
        vm.render = true;
    });

}

angular.module('main').controller('SwitchesController', SwitchesController);
