angular.module('main').directive('radio', function() {
    return {
        scope: {},
        controller: 'RadioController',
        controllerAs: 'vm',
        templateUrl: 'app/radio/radio.tpl.html'
    }
});
