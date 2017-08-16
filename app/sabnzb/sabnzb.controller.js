function SabnzbController($scope, $rootScope, $http, CONFIG, $interval) {

    var vm                = this;
    var hostname          = CONFIG.sabnzb_hostname + '?apikey=' + CONFIG.sabnzb_api + '&output=json';
    vm.title              = $scope.name;
    vm.job                = 'resume';
    vm.downloads          = {};
    vm.history            = {};
    vm.toggleDownload     = toggleDownload;

    if(CONFIG.sabnzb_hostname && CONFIG.sabnzb_api){
        activate();
    }

    ///////////////////////////////

    function activate(){
        getDownloads();
        getHistory();
    }

    //// Public interface

    function getDownloads(){
        $http.get(hostname + '&mode=queue').then(function(res) {
            vm.downloads = res.data.queue;
        });
    }

    function getHistory(){
        $http.get(hostname + '&mode=history&limit=3').then(function(res) {
            vm.history = res.data.history;
        });
    }

    function toggleDownload(status, id){
        if(status === 'Downloading'){ vm.job = 'pause'; }
        if(status === 'Pause' || status === 'Idle'){ vm.job = 'resume'; }
        console.log(vm.job);
        $http.get(hostname + '&mode=queue&name=' + vm.job + '&value=' + id).then(function(res) {
            getDownloads();
        });
    }

    //// Update

    var timepolling = $interval(function() {
        if(CONFIG.sabnzb_hostname && CONFIG.sabnzb_api){
            getDownloads();
        }
    }, 5000);

    $rootScope.$on('$reload', function (event, data) {
        if(CONFIG.sabnzb_hostname && CONFIG.sabnzb_api){
            getHistory();
        }
    });

}

angular.module('main').controller('SabnzbController', SabnzbController);
