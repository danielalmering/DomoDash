angular.module('main').directive('sabnzb', function() {
    return {
        scope: {
            name: '@'
        },
        controller: 'SabnzbController',
        controllerAs: 'vm',
        templateUrl: 'app/sabnzb/sabnzb.tpl.html'
    }
});
