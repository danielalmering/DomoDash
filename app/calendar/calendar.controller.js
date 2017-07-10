function CalendarController($scope, $rootScope, $http, CONFIG) {

    var vm                = this;
    vm.calendarlist       = [];
    vm.calendar           = [];

    vm.clientid           = CONFIG.calendar_api;
    vm.url                = 'https://www.googleapis.com/auth/calendar';

    activate();

    ///////////////////////////////

    function activate(){
        gapi.auth.authorize({client_id: vm.clientid, scope: vm.url, immediate: false}, Authenticate);
        return false;
    }

    //// Public interface

    function Authenticate(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
           // authorizeButton.style.visibility = 'hidden';
            getCalendar();
        } else {
            authorizeButton.style.visibility = '';
            authorizeButton.onclick = handleAuthClick;
        }
    }

    function getCalendar() {
        gapi.client.load('calendar', 'v3', function() {

            var request = gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': '2015-12-23T04:26:52.000Z'//Suppose that you want get data after 23 Dec 2014
             });

            request.execute(function(res){
                vm.calendarlist = res.items;
                vm.calandar = res;
            });
        });
    }

    //// Update

    $rootScope.$on('$reload', function (event, data) {
    });

}

angular.module('main').controller('CalendarController', CalendarController);
