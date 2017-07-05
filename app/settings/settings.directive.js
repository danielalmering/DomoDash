angular.module('main').directive('settings', function() {
    return {
        scope: {},
        controller: 'SettingsController',
        controllerAs: 'vm',
        templateUrl: 'app/settings/settings.tpl.html'
    }
});
