angular.module('main', [])
  .constant('HOSTNAME',                   CONFIG_HOSTNAME)
  .constant('HOSTLOGIN',                  CONFIG_HOSTLOGIN)
  .constant('REFRESH',                    CONFIG_REFRESH )
  .constant('BGIMAGES',                   CONFIG_BGIMAGES )
  .constant('WEATHER_WUNDERGROUND_API',   CONFIG_WEATHER_WUNDERGROUND_API)
  .constant('WEATHER_COUNTRY',            CONFIG_WEATHER_COUNTRY)
  .constant('WEATHER_LOCATION',           CONFIG_WEATHER_LOCATION)
  .constant('WEATHER_REFRESH',            CONFIG_WEATHER_REFRESH)
  .constant('NEWS_RSS_URLS',              CONFIG_NEWS_RSS_URLS)
  .constant('NEWS_RSS_MAXITEMS',          CONFIG_NEWS_RSS_MAXITEMS)
  .constant('COLUMS',                     CONFIG_COLUMS)
  .constant('BLOCKS',                     CONFIG_BLOCKS)
  .run(function($interval, $rootScope, REFRESH, BGIMAGES, HOSTLOGIN){

      $rootScope.background = BGIMAGES;

      var polling = $interval(function() {
          $rootScope.background = Math.floor(Math.random() * BGIMAGES) + 1  ;
          $rootScope.$broadcast('$reload');
      }, REFRESH);
});
