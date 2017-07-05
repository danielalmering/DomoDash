function TabsController($scope, $element, $rootScope, $http, $compile, CONFIG) {

    var vm                = this;
    vm.tabs               = CONFIG.tabs;
    vm.activetab          = 0;

    vm.setTab             = setTab;
    vm.isSet              = isSet;

    activate();

    ///////////////////////////////

    function activate(){
    }

    //// Public interface

    function setTab(id){
        vm.activetab = id;
    }

    function isSet(id){
        return vm.activetab === id;
    }

}

angular.module('main').controller('TabsController', TabsController);
