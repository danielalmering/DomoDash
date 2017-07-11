angular.module('main').directive('device', function() {
    return {
        scope: {
            data: '=',
            id: '=',
            name: '@'
        },
        controller: 'DevicesController',
        controllerAs: 'vm',
        templateUrl: 'app/devices/devices.tpl.html'
    }
});
