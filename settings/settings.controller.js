function SettingsController($scope, $rootScope, $http) {

    var vm                = this;
    vm.settings           = {};
    vm.load               = $rootScope.load;

    vm.username           = '';
    vm.password           = '';
    vm.isActive           = false;
    vm.saveSettings       = saveSettings;
    vm.editNews           = editNews;
    vm.editColums         = editColums;
    vm.editBlocks         = editBlocks;
    vm.editTabs           = editTabs;
    vm.toggle             = toggle;

    activate();

    ///////////////////////////////

    function activate(){
        getSettings();
    }

    //// Public interface

    function toggle(){
        vm.isActive = !vm.isActive;
    }

    function getSettings(){
        $http.get('../config.json').then(function(res) {
            vm.settings = res.data;

            if(!vm.settings.news){
                vm.settings.news      = [];
            }
            if(!vm.settings.colums){
                vm.settings.colums    = [];
            }
            if(!vm.settings.blocks){
                vm.settings.blocks    = [];
            }
            if(!vm.settings.tabs){
                vm.settings.tabs      = [];
            }
        });
    }

    function saveSettings(){

        vm.settings.HOSTLOGIN = 'username=' + vm.username + '&password=' + vm.password + '&';

        $http.post('settings/settings.save.php', vm.settings).then(function(res) {
            getSettings();
        });
    }

    function editNews(news, type){
        if(type === 'add'){
            vm.settings.news.push({ location: ""});
        } else {
            var newList = [];
            angular.forEach(vm.settings.news, function(selected){
                if(!selected.selected){ newList.push(selected); }
            });
            vm.settings.news = newList;
        }
    };

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
            vm.settings.blocks.push({ type: "", class: "", colum: "", title: ""});
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
