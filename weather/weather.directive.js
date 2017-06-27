angular.module('main').directive('weather', function() {
    return {
        scope: {},
        controller: 'WeatherController',
        controllerAs: 'vm',
        templateUrl: 'weather/weather.tpl.html'
    }
});
