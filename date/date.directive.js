angular.module('main').directive('date', function() {
    return {
        scope: {},
        controller: 'DateController',
        controllerAs: 'vm',
        templateUrl: 'date/date.tpl.html'
    }
});
