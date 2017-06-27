angular.module('main').directive('switches', function() {
    return {
        scope: {},
        controller: 'SwitchesController',
        controllerAs: 'vm',
        templateUrl: 'switches/switches.tpl.html'
    }
});
