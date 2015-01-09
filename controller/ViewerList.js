define(function(require, exports, module) {

    var angular = require('angular');
    var loader = require('FileLoader');
    var api = require('GithubAPI');
    var repositoryData = {};


    function getName(url){
        var path = url;
        if(path.match(/[^/]+$/)){
            path = path.match(/[^/]+$/)[0];
        }
        return path;
    }
    
    var controller = function($scope,Data,$routeParams,$location){
    	$scope.Data = Data;
    	var vm = $scope;

        vm.check = true;
        vm.selectDir = '';
        vm.select = $routeParams.repo;

        $scope.file = function(item) {
           var re = new RegExp('.*'+vm.search+'.*','i'); 
           var all = vm.check || item.title.match(/.*\.md/gi);
           return re.test(item.path) && item.type==="blob" && all;
        };

        $scope.dir = function(item) {
           return item.type!=="blob";
        };

    	vm.array = [];
        /*loader.Load(function(arr){
            $scope.$apply(function(){
                for(var i = 0; i< arr.length; i++){
                    var blog = arr[i];
                    vm.array.push({
                        id:encodeURIComponent(blog.name),
                        title:getName(blog.name),
                        createdAt:"2015-1-5",
                        filter:"Blog",
                        contentThumb:blog.content,
                    })
                }
            });
        });*/

        //console.log(vm.check);

        
        //console.log(repositoryData['javascript']);
        function showlist(list){
            var index = 0;
            $.map(list,function(item){

                    vm.array.push({
                        type:item.type,
                        url:encodeURIComponent(item.url),
                        title:getName(item.path),
                        path:item.path,
                        index:++index
                    });

            });
        }

        

        
	    vm.$watchCollection('select', function() {
            //alert(vm.select);
            vm.array=[];
            vm.search = "";
            if(!vm.select){
                vm.select = "javascript";
            }
            if($location.path() != '/repo/'+vm.select+'/');
                $location.path('/repo/'+vm.select+'/');
			if(!repositoryData[vm.select]){
                api.getFileList(vm.select,function(list){
                    repositoryData[vm.select] = list;
                    $scope.$apply(function(){
                        showlist(list);
                    });
                });
            }else{
                showlist(repositoryData[vm.select]);
            }
	    });

        vm.$watchCollection('selectDir', function() {
            //alert(vm.select);
            vm.search = vm.selectDir+"/";
            if(vm.selectDir==="")
                vm.search="";
        });

	    vm.click = function(event){

	    }
    };
    
	module.exports = controller;

	
	
});