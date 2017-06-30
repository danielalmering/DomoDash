function NewsController($scope, $rootScope, $http, CONFIG, $timeout) {

    var vm                = this;
    vm.news               = [];
    vm.newstitle          = [];
    vm.newslimit          = 1;
    vm.newssources        = CONFIG.news;

    vm.changed            = true;
    vm.getNews            = getNews;

    //// Public interface

    function getNews(key, val){
        $http.get(val.location).then(function(res) {
            var x2js = new X2JS();
            var news = x2js.xml_str2json(res.data);
            vm.newstitle[key] = news.rss.channel.title;
            vm.news[key]  = shuffleArray(news.rss.channel.item);
            console.log(val.quantity);
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
        angular.forEach(CONFIG.news, function (val, key) {
            getNews(key, val);
        });
    });

}

angular.module('main').controller('NewsController', NewsController);
