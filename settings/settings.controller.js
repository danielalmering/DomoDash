function SettingsController($scope, $rootScope, $http) {

    var vm                = this;
    vm.settings           = {};

    vm.username           = '';
    vm.password           = '';
    vm.saveSettings       = saveSettings;
    vm.editColums         = editColums;
    vm.editBlocks         = editBlocks;
    vm.editTabs           = editTabs;

    activate();

    ///////////////////////////////

    function activate(){
        getSettings();
    }

    //// Public interface

    function getSettings(){
        $http.get('../config.json').then(function(res) {
            vm.settings = res.data;
            vm.settings.colums    = [];
            vm.settings.blocks    = [];
            vm.settings.tabs      = [];
        });
    }

    function saveSettings(){

        vm.settings.HOSTLOGIN = 'username=' + vm.username + '&password=' + vm.password + '&';

        // 'CONFIG_NEWS_RSS_URLS              = ['https://crossorigin.me/http://www.nu.nl/rss/algemeen', 'https://crossorigin.me/http://feeds.feedburner.com/tweakers/nieuws'];

        $http.post('settings/settings.save.php', vm.settings).then(function(res) {
            getSettings();
        });
    }

    function editColums(colum, type){
        if(type === 'add'){
            vm.settings.colums.push({ colum: "", class: ""});
        } else {
            var newList = [];
            angular.forEach(vm.settings.colums, function(selected){
                if(!selected.selected){ newList.push(selected); }
            });
            vm.settings.colums = newList;
        }
    };

    function editBlocks(block, type){
        if(type === 'add'){
            vm.settings.blocks.push({ type: "", class: "", colum: ""});
        } else {
            var newList = [];
            angular.forEach(vm.settings.blocks, function(selected){
                if(!selected.selected){ newList.push(selected); }
            });
            vm.settings.blocks = newList;
        }
    };

    function editTabs(tab, type){
        if(type === 'add'){
            vm.settings.tabs.push({ tab: "", type: "", class: "", title: ""});
        } else {
            var newList = [];
            angular.forEach(vm.settings.tabs, function(selected){
                if(!selected.selected){ newList.push(selected); }
            });
            vm.settings.tabs = newList;
        }
    };

}

angular.module('main').controller('SettingsController', SettingsController);
