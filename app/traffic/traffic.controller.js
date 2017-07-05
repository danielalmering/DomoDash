function TrafficController($scope, $rootScope, $http, CONFIG, $timeout, $filter) {

    var vm                = this;
    vm.traffic            = [];
    vm.newtrafficlist     = [];
    vm.url                = CONFIG.traffic_url;

    vm.activestate        = 'trafficjam';


    activate();

    ///////////////////////////////

    function activate(){
        getTraffic();
    }

    //// Public interface

    function getTraffic(){
        $http.get(vm.url).then(function(res) {
            vm.traffic = res.data.roadEntries;
            vm.newtrafficlist = {};
            angular.forEach(vm.traffic, function(res) {
              vm.newtrafficlist = res;
                angular.forEach(res.events, function(val, key) {
                    if(val.length != 0 && key == 'roadWorks'){
                        angular.merge(vm.newtrafficlist, {roadwork: val});
                    } else if(val.length != 0 && key == 'trafficJams') {
                        angular.merge(vm.newtrafficlist, {trafficjam: val});
                    }
                });

            });
        });
    }

    //// Update

    $rootScope.$on('$reload', function (event, data) {
        getTraffic();
    });

}

angular.module('main').controller('TrafficController', TrafficController);
