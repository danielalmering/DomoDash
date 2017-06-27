function NewsController($scope, $rootScope, $http, NEWS_RSS_URLS, NEWS_RSS_MAXITEMS, REFRESH, $timeout) {

    var vm                = this;
    vm.news               = [];
    vm.newstitle          = [];
    vm.newssources        = NEWS_RSS_URLS;

    vm.limit              = NEWS_RSS_MAXITEMS;
    vm.changed            = true;
    vm.getNews            = getNews;

    //// Public interface

    function getNews(key, val){

        $http.get(val).then(function(res) {
            var x2js = new X2JS();
            var news = x2js.xml_str2json(res.data);
            vm.newstitle[key] = news.rss.channel.title;
            vm.news[key]  = shuffleArray(news.rss.channel.item);
            $timeout(function() {
                vm.changed = false;
            }, 1000);
        });

    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    //// Update

    $rootScope.$on('$reload', function (event, data) {
        vm.changed = true;
        angular.forEach(NEWS_RSS_URLS, function (val, key) {
            getNews(key, val);
        });
    });

}

angular.module('main').controller('NewsController', NewsController);
