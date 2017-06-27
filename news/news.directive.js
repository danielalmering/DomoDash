angular.module('main').directive('news', function() {
    return {
        scope: {},
        controller: 'NewsController',
        controllerAs: 'vm',
        templateUrl: 'news/news.tpl.html'
    }
});
