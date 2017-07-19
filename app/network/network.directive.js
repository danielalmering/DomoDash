angular.module('main').directive('network', function() {
    return {
        scope: {},
        controller: 'NetworkController',
        controllerAs: 'vm',
        templateUrl: 'app/network/network.tpl.html'
    }
});
