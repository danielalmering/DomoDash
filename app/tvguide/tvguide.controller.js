function TvguideController($scope, $rootScope, $http, CONFIG) {

    var vm                = this;
    vm.hosturl            = 'https://cors-anywhere.herokuapp.com/http://www.tvgids.nl/json/lists/';
    vm.channels           = {};

    activate();

    ///////////////////////////////

    function activate(){
        getChannels();
    }

    //// Public interface

    function getChannels() {
        $http.get(vm.hosturl + 'channels.php').then(function(res) {
            vm.channels = res.data;
            console.log(res.data.slice(1));
        });
    }


    //// Update

    $rootScope.$on('$reload', function (event, data) {
    });

}

angular.module('main').controller('TvguideController', TvguideController);
