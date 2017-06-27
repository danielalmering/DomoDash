function ForecastController($scope, $rootScope, $http, $interval, HOSTNAME, WEATHER_WUNDERGROUND_API, WEATHER_COUNTRY, WEATHER_LOCATION, WEATHER_REFRESH, $timeout) {

    var vm                = this;
    vm.active             = activate();
    vm.getIcon            = getIcon;

    ///////////////////////////////

    function activate(){
        getForecast();
    }

    //// Public interface

    function getForecast(){
        $http.get('https://api.wunderground.com/api/' + WEATHER_WUNDERGROUND_API + '/forecast10day/q/' + WEATHER_COUNTRY + '/' + WEATHER_LOCATION + '.json').then(function(res) {
            vm.forecast = res.data.forecast.simpleforecast.forecastday;
            console.log(res.data.forecast.simpleforecast.forecastday);
        });
    }

    function getIcon(code, key){
        $timeout(function() {
            var skycons = new Skycons({"color": "white"});
            var icon = 'icon' + key;

            if(code=='chanceflurries') 	  skycons.add(icon, Skycons.WIND);
          	if(code=='chancerain') 		    skycons.add(icon, Skycons.RAIN);
          	if(code=='chancesleet') 	    skycons.add(icon, Skycons.SLEET);
          	if(code=='chancesnow') 		    skycons.add(icon, Skycons.SNOW);
          	if(code=='chancetstorms') 	  skycons.add(icon, Skycons.WIND);
          	if(code=='clear') 			      skycons.add(icon, Skycons.CLEAR_DAY);
          	if(code=='cloudy') 			      skycons.add(icon, Skycons.CLOUDY);
          	if(code=='flurries') 		      skycons.add(icon, Skycons.WIND);
          	if(code=='fog') 			        skycons.add(icon, Skycons.FOG);
          	if(code=='hazy') 			        skycons.add(icon, Skycons.PARTLY_CLOUDY_DAY);
          	if(code=='mostlycloudy') 	    skycons.add(icon, Skycons.CLOUDY);
          	if(code=='mostlysunny') 	    skycons.add(icon, Skycons.CLEAR_DAY);
          	if(code=='partlycloudy') 	    skycons.add(icon, Skycons.PARTLY_CLOUDY_DAY);
          	if(code=='partlysunny') 	    skycons.add(icon, Skycons.PARTLY_CLOUDY_DAY);
          	if(code=='sleet') 			      skycons.add(icon, Skycons.SLEET);
          	if(code=='rain') 			        skycons.add(icon, Skycons.RAIN);
          	if(code=='snow') 			        skycons.add(icon, Skycons.SNOW);
          	if(code=='sunny') 			      skycons.add(icon, Skycons.CLEAR_DAY);
          	if(code=='tstorms') 		      skycons.add(icon, Skycons.WIND);

            skycons.play();
        }, 0);

    }


    //// Update

    var polling = $interval(function() {
        getForecast();
    }, WEATHER_REFRESH);

}

angular.module('main').controller('ForecastController', ForecastController);
