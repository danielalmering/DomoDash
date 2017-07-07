function SpotifyController($scope, $rootScope, $http, $location, CONFIG, HOSTLOGIN) {

    var vm                = this;
    vm.switches           = [];
    vm.settings           = CONFIG;

    activate();

    ///////////////////////////////

    function activate(){

        if(CONFIG.spotify_access_token === undefined){
            makeToken();
        } else {
            getPlaylist(CONFIG.spotify_access_token);
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
        var url = encodeURIComponent('http://' + window.location.host + '//#');

        if(!$location.hash()){
            window.location = 'https://accounts.spotify.com/authorize/?client_id=' + CONFIG.spotify_clientid + '&redirect_uri=' + url + '&scope=playlist-read-private%20user-read-private%20user-read-email&response_type=token';
        } else {
            vm.settings.spotify_access_token = getHashParams()['access_token'];

            $http.post('app/settings/settings.save.php', vm.settings);
        }
    }

    function getPlaylist(token){
        $http.get('https://api.spotify.com/v1/users/dycati/playlists', { headers: {'Authorization': 'Bearer ' + token}}).then(function(res) {
            console.log(res.data);
        });
    }

}

angular.module('main').controller('SpotifyController', SpotifyController);
