function SwitchesController($scope, $rootScope, $http, CONFIG, HOSTLOGIN) {

    var vm                = this;
    vm.switches           = [];
    vm.switchDevice       = switchDevice;
    vm.getIcon            = getIcon;

    activate();

    ///////////////////////////////

    function activate(){
        getSwitches();
    }

    //// Public interface

    function getSwitches(){
        $http.get(CONFIG.hostname + '/json.htm?' + HOSTLOGIN + 'type=devices&filter=light&used=true&order=Name').then(function(res) {
            vm.switches = res.data.result;
        });
    }

    function switchDevice(device){

        if(device.Status === 'Off'){
            var status = 'On';
        } else {
            var status = 'Off';
        }

        $http.get(CONFIG.hostname + '/json.htm?' + HOSTLOGIN + 'type=command&param=switchlight&idx=' + device.idx + '&switchcmd=' + status).then(function() {
            getSwitches();
        });
    }

    function getIcon(device){
        if(device.SwitchType === 'Dimmer'
        || device.SwitchType === 'Media Player'
        || device.SwitchType === 'On/Off'
        || device.SwitchType === 'Selector'){
            switch (device.Image) {
                case 'Light':         return 'fa-lightbulb-o'; break;
                case 'Alarm':         return 'fa-bell'; break;
                case 'Amplifier':     return 'fa-bullhorn'; break;
                case 'ChristmasTree': return 'fa-tree'; break;
                case 'Computer':      return 'fa-laptop'; break;
                case 'ComputerPC':    return 'fa-desktop'; break;
                case 'Cooling':       return 'fa-snowflake-o'; break;
                case 'Fan':           return 'fa-refresh'; break;
                case 'Fireplace':     return 'fa-fire'; break;
                case 'Generic':       return 'fa-power-off'; break;
                case 'Harddisk':      return 'fa-hdd-o'; break;
                case 'Heating':       return 'fa-thermometer-full'; break;
                case 'Media':         return 'fa-youtube-play'; break;
                case 'Phone':         return 'fa-mobile'; break;
                case 'Printer':       return 'fa-print'; break;
                case 'Speaker':       return 'fa-volume-up'; break;
                case 'TV':            return 'fa-television'; break;
                case 'WallSocket':    return 'fa-plug'; break;
                case 'Water':         return 'fa-tint'; break;
                default:
            }
        } else {
            switch (device.SwitchType) {
                case 'Blinds':                      return 'fa-bars'; break;
                case 'Blinds Inverted':             return 'fa-bars'; break;
                case 'Blinds Percentage':           return 'fa-bars'; break;
                case 'Blinds Percentage Inverted':  return 'fa-bars'; break;
                case 'Contact':                     return 'fa-exchange'; break;
                case 'Door Lock':                   return 'fa-lock'; break;
                case 'Doorbell':                    return 'fa-bell-o'; break;
                case 'Dusk Sensor':                 return 'fa-sun-o'; break;
                case 'Motion Sensor':               return 'fa-assistive-listening-systems'; break;
                case 'Push Off Button':             return 'fa-toggle-off'; break;
                case 'Push On Button':              return 'fa-toggle-on'; break;
                case 'Smoke Detector':              return 'fa-cloud'; break;
                case 'Venetian Blinds EU':          return 'fa-bars'; break;
                case 'Venetian Blinds US':          return 'fa-bars'; break;
                case 'X10 Siren':                   return 'fa-bullhorn'; break;
                default:
            }
        }
    }

    //// Update

    $rootScope.$on('$reload', function (event, data) {
        getSwitches();
    });

}

angular.module('main').controller('SwitchesController', SwitchesController);
