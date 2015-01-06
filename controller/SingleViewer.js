define(function(require, exports, module) {

    var angular = require('angular');
    var loader = require('FileLoader');
    var api = require('GithubAPI');

    var controller = function($scope,Data,$routeParams,$location){
    	$scope.Data = Data;
    	var vm = $scope;

    	//console.log($routeParams);
    	//contentThumb

    	/*loader.LoadSingleFile($routeParams.id,function(blog){
            $scope.$apply(function(){
                
                vm.title=getName(blog.name);
                vm.createdAt="2015-1-5";
                vm.filter="Blog";
				vm.contentThumb=blog.content;
                
            });
        });*/

		api.getFileContent($routeParams.url,function(content){
			//console.log(content);
			// /content = window.atob(content);
			content = decodeURIComponent(escape(window.atob(content)));
            vm.src = content;
			//console.log(content);
            $scope.$apply(function(){
                vm.title=$routeParams.name;
                if(vm.title.match(/.*\.md/gi)){
                	vm.content= content;
                    vm.edit = false;
                }else{
                    vm.content= '<pre>'+content+'</pre>';
                    vm.edit = true;
                }
                
            });

        });

        

        vm.onClick = function(event){
            eval(vm.src);
        }

	    vm.$watchCollection('edit', function() {
			if(vm.edit){
                vm.content= vm.src;
            }else{
                vm.content= '<pre>'+vm.src+'</pre>';
            }
	    });
    };
    
	module.exports = controller;

	
	
});