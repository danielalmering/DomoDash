angular.module('main').directive('switches', function() {
    return {
        scope: {},
        controller: 'SwitchesController',
        controllerAs: 'vm',
        templateUrl: 'app/switches/switches.tpl.html'
    }
});
