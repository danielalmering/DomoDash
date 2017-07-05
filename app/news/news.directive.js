angular.module('main').directive('news', function() {
    return {
        scope: {},
        controller: 'NewsController',
        controllerAs: 'vm',
        templateUrl: 'app/news/news.tpl.html'
    }
});
