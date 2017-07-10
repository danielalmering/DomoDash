angular.module('main').directive('calendar', function() {
    return {
        scope: {},
        controller: 'CalendarController',
        controllerAs: 'vm',
        templateUrl: 'app/calendar/calendar.tpl.html'
    }
});
