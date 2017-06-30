angular.module('main').directive('tabs', function() {
    return {
        scope: {},
        controller: 'TabsController',
        controllerAs: 'vm',
        templateUrl: 'tabs/tabs.tpl.html'
    }
});
