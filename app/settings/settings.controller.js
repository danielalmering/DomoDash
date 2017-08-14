function SettingsController($scope, $rootScope, $http, $timeout, CONFIG) {

    var vm                = this;
    vm.settings           = CONFIG;
    vm.load               = $rootScope.load;

    vm.username           = '';
    vm.password           = '';
    vm.isActive           = false;
    vm.message            = false;
    vm.saveSettings       = saveSettings;
    vm.editNews           = editNews;
    vm.editColums         = editColums;
    vm.editBlocks         = editBlocks;
    vm.toggle             = toggle;
    vm.saveManualy        = saveManualy;

    vm.availableblocks    = ['Heading', 'Device', 'News', 'Weather', 'Traffic', 'Calendar', 'Spotify']

    activate();

    ///////////////////////////////

    function activate(){
        getSettings();
    }

    //// Public interface

    function toggle(){
        vm.isActive = !vm.isActive;
    }

    function getSettings(render){
        $http.get('././config.json' + '?nocache=' + (new Date()).getTime()).then(function(res) {
            vm.settings          = res.data;

            if(res.data.username && res.data.password){
                vm.settings.username = atob(res.data.username);
                vm.settings.password = atob(res.data.password);
            }

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

            if(render === true){
                $rootScope.$broadcast('$render', res.data);
            }
        });
    }

    function saveSettings(){

        if(vm.settings.username && vm.settings.password){
            vm.settings.username = btoa(vm.settings.username);
            vm.settings.password = btoa(vm.settings.password);
        }

        $http.post('app/settings/settings.save.php', vm.settings).then(function(res) {

            if(res.data.status === 'success'){
                vm.message = true;
                $timeout(function(){ vm.message = false }, 2000);
                getSettings(true);
            }
        });
    }

    function saveManualy(){
        vm.toJSON = '';
        vm.toJSON = angular.toJson(vm.settings);
        var blob = new Blob([vm.toJSON], { type:"application/json;charset=utf-8;" });
        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href',window.URL.createObjectURL(blob));
        downloadLink.attr('download', 'config.json');
        downloadLink[0].click();
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
            vm.settings.blocks.push({ type: "", class: "", colum: "colum" + vm.settings.colums[0].colum, title: ""});
        } else {
            var newList = [];
            angular.forEach(vm.settings.blocks, function(selected){
                if(!selected.selected){ newList.push(selected); }
            });
            vm.settings.blocks = newList;
        }
    };

}

angular.module('main').controller('SettingsController', SettingsController);
