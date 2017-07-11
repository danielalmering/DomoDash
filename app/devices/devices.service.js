(function(){
    'use strict';

    angular.module('main').service('devicesService', devicesService);

    function devicesService($http, $filter, $timeout, CONFIG, HOSTLOGIN){

        var devices   = {};
        var instance  = {
            get: get
        };

        return instance;

        function get(id, update){
            if(devices.length && update === false){
                return selectDevice(devices, id);
            } else {
                return getDevices(devices, id);
            }
        }

        function getDevices(devices, id){
            return $http.get(CONFIG.hostname + '/json.htm?' + HOSTLOGIN + 'type=devices&filter=light&used=true&order=Name').then(function(res) {
                devices = res.data.result;
                return selectDevice(devices, id);
            });
        }

        function selectDevice(dev, id){
            var selecteddevice = dev.filter(function(e) {
                return e.idx == id;
            });

            return selecteddevice;
        }

	}
})();
