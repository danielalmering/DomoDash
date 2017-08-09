angular.module('main').directive('tvguide', function() {
    return {
        scope: {},
        controller: 'TvguideController',
        controllerAs: 'vm',
        templateUrl: 'app/tvguide/tvguide.tpl.html'
    }
});
