angular.module('main').directive('settings', function() {
    return {
        scope: {},
        controller: 'SettingsController',
        controllerAs: 'vm',
        templateUrl: 'settings/settings.tpl.html'
    }
});
