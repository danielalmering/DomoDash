function DateController($scope, $filter, $interval) {

    var vm                = this;

    vm.active             = activate();

    vm.time               = '';
    vm.day                = '';
    vm.date               = '';

    ///////////////////////////////

    function activate(){
        getDate();
    }

    //// Public interface

    function getDate(){
        vm.time = $filter('date')(new Date(),'HH:mm:ss');
        vm.day  = $filter('date')(new Date(),'EEEE');
        vm.date = $filter('date')(new Date(),'dd - MM - yyyy');
    }

    //// Update

    var polling = $interval(function() {
        getDate();
    }, 1000);


}

angular.module('main').controller('DateController', DateController);
