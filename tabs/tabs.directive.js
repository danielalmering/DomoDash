angular.module('main').directive('tabs', function($compile, TABS) {
    return {
        scope: {},
        controller: 'TabsController',
        controllerAs: 'vm',
        templateUrl: 'tabs/tabs.tpl.html'
    }
});
