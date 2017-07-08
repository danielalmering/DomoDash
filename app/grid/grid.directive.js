angular.module('main').directive('grid', function($compile, CONFIG) {
    return {
        scope: {},
        link: function(scope, element) {
            var vm = this;

            vm.colums = CONFIG.colums;
            vm.blocks = CONFIG.blocks;

            angular.forEach(vm.colums, function (res) {
                angular.element(document.getElementById('colums')).append('<div id="colum' + res.colum + '" class="colum ' + res.class +'"></div>');
            });

            $compile(element.contents())(scope);

            angular.forEach(vm.blocks, function (res) {
                getCorrectBlock(res);
            });

            function getCorrectBlock (res){
                switch (res.type) {
                    case 'Heading':
                        angular.element(document.getElementById(res.colum)).append('<div class="heading ' + res.class +'">' + res.title +'</div>');
                        break;
                    case 'Switches':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><switches></switches></block>');
                        break;
                    case 'News':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><news></news></block>');
                        break;
                    case 'Tabs':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><tabs id="tabs"></tabs></block>');
                        break;
                    case 'Weather':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><weather></weather></block>');
                        break;
                    case 'Traffic':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><traffic></traffic></block>');
                        break;
                    case 'Spotify':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><spotify></spotify></block>');
                        break;
                    default:
                }
            }

            $compile(element.contents())(scope);

        }
    }
});
