angular.module('main').directive('spotify', function() {
    return {
        scope: {},
        controller: 'SpotifyController',
        controllerAs: 'vm',
        templateUrl: 'app/spotify/spotify.tpl.html'
    }
});
