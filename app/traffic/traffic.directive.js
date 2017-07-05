angular.module('main').directive('traffic', function() {
    return {
        scope: {},
        controller: 'TrafficController',
        controllerAs: 'vm',
        templateUrl: 'app/traffic/traffic.tpl.html'
    }
});
