(function(){
    'use strict';

    angular.module('main').service('devicesService', devicesService);

    function devicesService($http, $filter, $timeout, CONFIG, HOSTLOGIN){

        var devices   = {};
        var instance  = {
            getDevices: getDevices,
            getDevice: getDevice,
        };

        return instance;

        function getDevices(){
            return $http.get(CONFIG.hostname + '/json.htm?' + HOSTLOGIN + 'type=devices&filter=light&used=true&order=Name').then(function(res) {
                devices = res.data.result;
                return devices;
            });
        }

        function getDevice(id){
            var selecteddevice = devices.filter(function(e) {
                return e.idx == id;
            });

            return selecteddevice;
        }

	}
})();
