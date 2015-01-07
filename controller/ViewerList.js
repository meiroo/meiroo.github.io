define(function(require, exports, module) {

    var angular = require('angular');
    var loader = require('FileLoader');
    var api = require('GithubAPI');
    var repositoryData = {};

    api.updateFileTest('javascript');

    




    function getName(url){
        var path = url;
        if(path.match(/[^/]+$/)){
            path = path.match(/[^/]+$/)[0];
        }
        return path;
    }
    
    var controller = function($scope,Data,$location,$routeParams){
    	$scope.Data = Data;
    	var vm = $scope;

        vm.search='';
        vm.check = true;

        $scope.myFilter = function(item) {
           var re = new RegExp('.*'+vm.search+'.*','i'); 
           var all = vm.check || item.title.match(/.*\.md/gi);
           return re.test(item.fullpath) && item.type==="blob" && all;
        };

        // var url = window.location.href;
        // var re = /code=([0-9a-zA-Z]*)/i;
        // if(url.match(re)){
        //     code = url.match(re)[1];
        //     alert(code);
        //     $.get('/AuthorizeGitHub1?code='+code, function(data) {
        //         /*optional stuff to do after success */
        //         alert(data);
        //     });
        // }


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