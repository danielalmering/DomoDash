angular.module('main').directive('weather', function() {
    return {
        scope: {},
        controller: 'WeatherController',
        controllerAs: 'vm',
        templateUrl: 'app/weather/weather.tpl.html'
    }
});
