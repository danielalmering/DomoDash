function SettingsController($scope, $rootScope, $http) {

    var vm                = this;
    vm.settings           = {};
    vm.username           = '';
    vm.password           = '';
    vm.saveSettings       = saveSettings;

    activate();

    ///////////////////////////////

    function activate(){
        // getSettings();
    }

    //// Public interface

    function saveSettings(){

        vm.settings.HOSTLOGIN = 'username=' + vm.username + '&password=' + vm.password + '&';

        // 'CONFIG_NEWS_RSS_URLS              = ['https://crossorigin.me/http://www.nu.nl/rss/algemeen', 'https://crossorigin.me/http://feeds.feedburner.com/tweakers/nieuws'];

        $http.post('settings/settings.save.php', vm.settings).then(function(res) {
            console.log('saved');
        });
    }

}

angular.module('main').controller('SettingsController', SettingsController);
