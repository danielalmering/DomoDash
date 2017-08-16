function SabnzbController($scope, $rootScope, $http, CONFIG, $interval) {

    var vm                = this;
    vm.title              = $scope.name;
    vm.job                = 'resume';
    vm.downloads          = {};
    vm.history            = {};
    vm.toggleDownload     = toggleDownload;

    if(CONFIG.sabnzb_hostname && CONFIG.sabnzb_api && CONFIG.sabnzb_internalhostname){
        activate();
    }

    ///////////////////////////////

    function activate(){
        getDownloads();
        getHistory();
    }

    //// Public interface

    function getDownloads(){
        $http.get(getHost() + '&mode=queue').then(function(res) {
            vm.downloads = res.data.queue;
        });
    }

    function getHistory(){
        $http.get(getHost() + '&mode=history&limit=3').then(function(res) {
            vm.history = res.data.history;
        });
    }

    function toggleDownload(status, id){
        if(status === 'Downloading'){ vm.job = 'pause'; }
        if(status === 'Pause' || status === 'Idle'){ vm.job = 'resume'; }
        console.log(vm.job);
        $http.get(getHost() + '&mode=queue&name=' + vm.job + '&value=' + id).then(function(res) {
            getDownloads();
        });
    }

    function getHost(){
        if(CONFIG.sabnzb_hostname.indexOf(location.hostname) != -1 || location.hostname === 'localhost') {
            hostname = CONFIG.sabnzb_hostname + '?apikey=' + CONFIG.sabnzb_api + '&output=json';
        } else {
            hostname = CONFIG.sabnzb_internalhostname + '?apikey=' + CONFIG.sabnzb_api + '&output=json';
        }

        return hostname;
    }


    //// Update

    var timepolling = $interval(function() {
        if(CONFIG.sabnzb_hostname && CONFIG.sabnzb_api && CONFIG.sabnzb_internalhostname){
            getDownloads();
        }
    }, 5000);

    $rootScope.$on('$reload', function (event, data) {
        if(CONFIG.sabnzb_hostname && CONFIG.sabnzb_api && CONFIG.sabnzb_internalhostname){
            getHistory();
        }
    });

}

angular.module('main').controller('SabnzbController', SabnzbController);
