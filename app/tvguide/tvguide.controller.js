function TvguideController($scope, $rootScope, $http, CONFIG) {

    var vm                = this;
    vm.hosturl            = 'https://cors-anywhere.herokuapp.com/http://www.tvgids.nl/json/lists/';
    vm.selectedCategory   = 'mostviewed';
    vm.offset             = 0;
    vm.channels           = [];
    vm.programs           = {};
    vm.sort               = sort;

    vm.sortedChannels = {
        mostviewed: [1,2,3,4,31,36,46,37,34,92,91,471,472,438,29,18,24,435,5,6,440,460],
        sport: [19,436,466,148,99,419,420,421,417,418,468,469,470],
        movies: [411,39,107,304],
        entertainment: [93,462,94,407,431,432,433,430,408,409,317,437,66,104,464,315,404,467],
        music: [25,425,427,426,428,429],
        children: [89,21,424,311,312,313,461],
        knowledge: [416,415,413,306,406,305,414,439,81,70,38,473],
        news: [26,422,86,423],
        regional: [108,109,110,111,112,113,103,100,101,102,116,114,115,40],
        erotic:  [401,434,105,400],
        other: [64,465,316 ,410,90,7,8,300,301,60,49,59,15,16,17,9,10,12,13,11,28,50,58,32]
    };

    activate();

    ///////////////////////////////

    function activate(){
        getChannels();
    }

    //// Public interface

    function getChannels() {
        $http.get(vm.hosturl + 'channels.php').then(function(res) {
            var data = res.data.map(function(channel) {
                channel.id = parseInt(channel.id);

                return channel;
            });

            for (var category in vm.sortedChannels) {
                vm.sortedChannels[category] = vm.sortedChannels[category].map(function(channelId){
                    return data.find(function(c){ return c.id === channelId });
                });

                vm.sortedChannels[category] = vm.sortedChannels[category].filter(function(item){
                    return item !== undefined;
                });
            };

            vm.channels = vm.sortedChannels;
            getPrograms();

        });
    }

    function getPrograms(){
        var firstChannel = vm.channels[vm.selectedCategory][vm.offset].id;
        var secondChannel = vm.channels[vm.selectedCategory][vm.offset + 1].id;

        $http.get(vm.hosturl + 'programs.php?channels=' + firstChannel + ',' + secondChannel + '&day=0').then(function(res) {
            vm.programs = res.data;

            angular.forEach(vm.programs, function(program, key){
                vm.programs[key] = filterProgramsByDate(program);
            });
        });
    }

    function filterProgramsByDate(programs){
        programs = Object.keys(programs).map(function (key) { return programs[key]; });

        return programs.filter(function(program){
            return new Date(program.datum_end).getTime() > Date.now();
        });
    }

    function sort(state){
        if(state === 'prev'){
            vm.offset -= 2;
        } else if(state === 'next'){
            vm.offset += 2;
        } else {
            vm.offset = 0;
        }

        getPrograms();
    }


    //// Update

    $rootScope.$on('$reload', function (event, data) {
        //getChannels();
    });

}

angular.module('main').controller('TvguideController', TvguideController);
