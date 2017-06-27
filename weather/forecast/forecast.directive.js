angular.module('main').directive('forecast', function() {
    return {
        scope: {},
        controller: 'ForecastController',
        controllerAs: 'vm',
        templateUrl: 'weather/forecast/forecast.tpl.html'
    }
});
