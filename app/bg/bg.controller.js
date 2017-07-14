function BackgroundController($scope, $rootScope, $timeout, CONFIG) {

    var vm                = this;
    var nr                = 1;
    vm.backgrounds        = [];
    vm.getImages          = getImages;
    vm.image              = [];

    if(CONFIG != undefined && CONFIG.bgimages != undefined){
        var bgimages = CONFIG.bgimages;
    } else {
        var bgimages = 1;
    }

    activate();

    ///////////////////////////////

    function activate(){
        getImages();
    }

    function getImages() {
        vm.image = 'assets/img/bg/'+nr+ '.gif';
    		nr++;
    	if(nr>bgimages) { nr=1; }

        $timeout(vm.getImages,6000);
    }

}

angular.module('main').controller('BackgroundController', BackgroundController).animation('.background__image',function() {
	return {
		leave:function(ele,done) {
			ele[0].style.opacity = 0;
			setTimeout(done,1500);
		}
	}
});
