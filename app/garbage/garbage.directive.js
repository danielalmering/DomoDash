angular.module('main').directive('garbage', function() {
    return {
        scope: {
            name: '@'
        },
        controller: 'GarbageController',
        controllerAs: 'vm',
        templateUrl: 'app/garbage/garbage.tpl.html'
    }
});
