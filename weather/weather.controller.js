function WeatherController($scope, $rootScope, $http, $interval, HOSTNAME, WEATHER_WUNDERGROUND_API, WEATHER_COUNTRY, WEATHER_LOCATION, WEATHER_REFRESH) {

    var vm                = this;

    vm.active             = activate();

    ///////////////////////////////

    function activate(){
        getWeather();
    }

    //// Public interface

    function getWeather(){
        $http.get('https://api.wunderground.com/api/' + WEATHER_WUNDERGROUND_API + '/conditions/q/' + WEATHER_COUNTRY + '/' + WEATHER_LOCATION + '.json').then(function(res) {
            vm.weather = res.data.current_observation;
            vm.location = vm.weather.display_location.city;

            getIcon(vm.weather.icon);
        });
    }

    function getIcon(code){
        var skycons = new Skycons({"color": "white"});

        if(code=='chanceflurries') 	  skycons.add("icon", Skycons.WIND);
      	if(code=='chancerain') 		    skycons.add("icon", Skycons.RAIN);
      	if(code=='chancesleet') 	    skycons.add("icon", Skycons.SLEET);
      	if(code=='chancesnow') 		    skycons.add("icon", Skycons.SNOW);
      	if(code=='chancetstorms') 	  skycons.add("icon", Skycons.WIND);
      	if(code=='clear') 			      skycons.add("icon", Skycons.CLEAR_DAY);
      	if(code=='cloudy') 			      skycons.add("icon", Skycons.CLOUDY);
      	if(code=='flurries') 		      skycons.add("icon", Skycons.WIND);
      	if(code=='fog') 			        skycons.add("icon", Skycons.FOG);
      	if(code=='hazy') 			        skycons.add("icon", Skycons.PARTLY_CLOUDY_DAY);
      	if(code=='mostlycloudy') 	    skycons.add("icon", Skycons.CLOUDY);
      	if(code=='mostlysunny') 	    skycons.add("icon", Skycons.CLEAR_DAY);
      	if(code=='partlycloudy') 	    skycons.add("icon", Skycons.PARTLY_CLOUDY_DAY);
      	if(code=='partlysunny') 	    skycons.add("icon", Skycons.PARTLY_CLOUDY_DAY);
      	if(code=='sleet') 			      skycons.add("icon", Skycons.SLEET);
      	if(code=='rain') 			        skycons.add("icon", Skycons.RAIN);
      	if(code=='snow') 			        skycons.add("icon", Skycons.SNOW);
      	if(code=='sunny') 			      skycons.add("icon", Skycons.CLEAR_DAY);
      	if(code=='tstorms') 		      skycons.add("icon", Skycons.WIND);

        skycons.play();
    }

    //// Update

    var polling = $interval(function() {
        getWeather();
    }, WEATHER_REFRESH);

}

angular.module('main').controller('WeatherController', WeatherController);
