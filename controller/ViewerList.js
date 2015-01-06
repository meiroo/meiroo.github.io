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
    
    var controller = function($scope,Data,$location){
    	$scope.Data = Data;
    	var vm = $scope;

        vm.search='';

        $scope.myFilter = function(item) {
           var re = new RegExp('.*'+vm.search+'.*','i'); 
           var all = vm.check || item.title.match(/.*\.md/gi);
           return re.test(item.fullpath) && item.type==="blob" && all;
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

        console.log(vm.check);

        
        //console.log(repositoryData['javascript']);
        function showlist(list){
            var index = 0;
            $.map(list,function(item){

                    vm.array.push({
                        type:item.type,
                        url:encodeURIComponent(item.url),
                        title:getName(item.path),
                        fullpath:item.path,
                        index:++index
                    });

            });
        }

        if(!repositoryData['javascript']){
            api.getFileList('javascript',function(list){
                repositoryData['javascript'] = list;
                $scope.$apply(function(){
                    showlist(list);
                });
            });
        }else{
            showlist(repositoryData['javascript']);
        }

        
	    vm.$watchCollection('Data.url', function() {
			vm.url = Data.url;
	    });

	    vm.click = function(event){

	    }
    };
    
	module.exports = controller;

	
	
});