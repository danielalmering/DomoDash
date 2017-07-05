angular.module('main').directive('tabs', function() {
    return {
        scope: {},
        controller: 'TabsController',
        controllerAs: 'vm',
        templateUrl: 'app/tabs/tabs.tpl.html'
    }
});
