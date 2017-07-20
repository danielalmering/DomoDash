function SpotifyController($scope, $rootScope, $http, $location, CONFIG, HOSTLOGIN) {

    var vm                = this;
    vm.playlist           = {};
    vm.settings           = CONFIG;
    vm.defaultplaylist    = '';
    vm.playlisttotal      = '';
    vm.playPlaylist       = playPlaylist;

    activate();

    ///////////////////////////////

    function activate(){

        if(CONFIG.spotify_access_token === undefined){
            makeToken();
        } else {
            getPlaylist(CONFIG.spotify_access_token);
            getCurrent(CONFIG.spotify_access_token);
        }

    }

    //// Public interface

    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    function makeToken(){
        var url = encodeURIComponent(window.location.href + '#');

        if(!$location.hash()){
            window.location = 'https://accounts.spotify.com/authorize/?client_id=' + CONFIG.spotify_clientid + '&redirect_uri=' + url + '&scope=playlist-read-private%20user-read-private%20user-read-email%20user-read-currently-playing%20user-read-playback-state%20user-read-recently-played&response_type=token';
        } else {
            vm.settings.spotify_access_token = getHashParams()['access_token'];

            $http.post('app/settings/settings.save.php', vm.settings).then(function(res) {
                getPlaylist(res.spotify_access_token);
                getCurrent(res.spotify_access_token);
            });

        }
    }

    function getPlaylist(token){
        $http.get('https://api.spotify.com/v1/users/' + CONFIG.spotify_username + '/playlists', { headers: {'Authorization': 'Bearer ' + token}}).then(function success(res) {
              vm.playlist = res.data.items;
          }, function error(res) {
              if(res.data.error.message === 'The access token expired'){
                  makeToken();
              }
        });
    }

    function getCurrent(token){
        $http.get('https://api.spotify.com/v1/me/player/currently-playing', { headers: {'Authorization': 'Bearer ' + token}}).then(function(res) {
            if(res.data.context === null){
                playPlaylist(vm.playlist[0].uri);
            } else {
                vm.defaultplaylist = 'http://embed.spotify.com?uri=' + res.data.context.uri + '&theme=black&view=coverart';
            }
        });
    }

    function playPlaylist(uri){
        vm.defaultplaylist = 'http://embed.spotify.com?uri=' + uri + '&theme=black&view=coverart';
    }

    //// Update

    $rootScope.$on('$reload', function (event, data) {
        if(CONFIG.spotify_access_token === undefined){
            makeToken();
        } else {
            getPlaylist(CONFIG.spotify_access_token);
            getCurrent(CONFIG.spotify_access_token);
        }
    });

}

angular.module('main').controller('SpotifyController', SpotifyController);
