(function(){
    'use strict';

    angular.module('main').service('devicesService', devicesService);

    function devicesService($http, $filter, $timeout, CONFIG, HOSTLOGIN){

        var devices   = {};
        var hostname  = CONFIG.hostname;
        var instance  = {
            get: get
        };

        return instance;

        function get(id, update){
            getHost();

            if(devices.length && update === false){
                return selectDevice(devices, id);
            } else {
                return getDevices(devices, id);
            }
        }

        function getDevices(devices, id){
            return $http.get(hostname + '/json.htm?' + HOSTLOGIN + 'type=devices&filter=light&used=true&order=Name').then(function(res) {
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

        function getHost(){
            if(CONFIG.hostname.indexOf(location.hostname) != -1) {
                hostname = CONFIG.hostname;
            } else {
                hostname = CONFIG.internalhostname;
            }

            return hostname;
        }

	}
})();
