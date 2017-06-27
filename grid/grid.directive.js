angular.module('main').directive('grid', function($compile, COLUMS, BLOCKS) {
    return {
        scope: {},
        link: function(scope, element) {
            var vm = this;

            vm.colums = COLUMS;
            vm.blocks = BLOCKS;

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
                        angular.element(document.getElementById(res.colum)).append('<block class="block news ' + res.class +'"><news></news></block>');
                        break;
                    case 'Date':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><date></date></block>');
                        break;
                    case 'Weather':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><weather></weather></block>');
                        break;
                    case 'Forecast':
                        angular.element(document.getElementById(res.colum)).append('<block class="block forecast ' + res.class +'"><forecast></forecast></block>');
                        break;
                    default:
                }
            }

            $compile(element.contents())(scope);

        }
    }
});
