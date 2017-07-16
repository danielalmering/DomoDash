angular.module('main').directive('tooltip', [function (document) {
    return { link: function (scope, element, attr) {
        // use tag's title text for a popup
        element
            .addClass('toolti\p-wrap')
            .append(angular.element('<div class="tooltip-text">'+attr.title+'</div>'))
            .removeAttr('title');

        element.bind('click', function() {
            if(element[0].className.indexOf('active') !== -1){
                element.removeClass('active');
            } else {
                element.addClass('active');
            }
        });
    }};
}]);
