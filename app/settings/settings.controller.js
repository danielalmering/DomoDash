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
    vm.editNetworkdevices = editNetworkdevices;
    vm.toggle             = toggle;
    vm.saveManualy        = saveManualy;

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
        $http.get('././config.json').then(function(res) {
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
                $rootScope.$broadcast('$render', vm.settings);
            }
        });
    }

    function saveSettings(){

        if(vm.settings.username && vm.settings.password){
            vm.settings.username = btoa(vm.settings.username);
            vm.settings.password = btoa(vm.settings.password);
        }

        $http.post('app/settings/settings.save.php', vm.settings).then(function(res) {
            getSettings(true);
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
            vm.settings.blocks.push({ type: "", class: "", colum: "", title: ""});
        } else {
            var newList = [];
            angular.forEach(vm.settings.blocks, function(selected){
                if(!selected.selected){ newList.push(selected); }
            });
            vm.settings.blocks = newList;
        }
    };

    function editNetworkdevices(network, type){
        if(type === 'add'){
            vm.settings.network.push({ ip: "", name: "", icon: ""});
        } else {
            var newList = [];
            angular.forEach(vm.settings.network, function(selected){
                if(!selected.selected){ newList.push(selected); }
            });
            vm.settings.network = newList;
        }
    };

}

angular.module('main').controller('SettingsController', SettingsController);
