angular.module('main').directive('traffic', function() {
    return {
        scope: {},
        controller: 'TrafficController',
        controllerAs: 'vm',
        templateUrl: 'traffic/traffic.tpl.html'
    }
});
