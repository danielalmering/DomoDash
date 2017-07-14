angular.module('main').directive('bg', function() {
    return {
        scope: {},
        controller: 'BackgroundController',
        controllerAs: 'vm',
        templateUrl: 'app/bg/bg.tpl.html'
    }
});
