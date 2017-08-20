angular.module('main').directive('garbage', function() {
    return {
        scope: {},
        controller: 'GarbageController',
        controllerAs: 'vm',
        templateUrl: 'app/garbage/garbage.tpl.html'
    }
});
