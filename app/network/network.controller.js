function NetworkController($scope, $rootScope, $http, CONFIG) {

    var vm                = this;
    vm.devices            = [];

    activate();

    ///////////////////////////////

    function activate(){
        networkDevices();
    }

    //// Public interface

    function networkDevices(){
        if(CONFIG.network){
            $http.get('app/network/network.ping.php').then(function(res) {
                vm.devices = res.data;
            });
        }
    }

    //// Update

    $rootScope.$on('$reload', function (event, data) {
        networkDevices();
    });

}

angular.module('main').controller('NetworkController', NetworkController);
