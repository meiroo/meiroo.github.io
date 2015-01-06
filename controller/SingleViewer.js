define(function(require, exports, module) {

    var angular = require('angular');
    var loader = require('FileLoader');
    var api = require('GithubAPI');

    var controller = function($scope,Data,$routeParams,$location){
    	$scope.Data = Data;
    	var vm = $scope;
    	vm.title = "test";

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
			//console.log(content);
            $scope.$apply(function(){
                vm.title=$routeParams.name;
                if(vm.title.match(/.*\.md/gi)){
                	vm.content= content;
                }else{
                	vm.content= '<pre>'+content+'</pre>';
                }
                
            });

        });



	    vm.$watchCollection('Data.url', function() {
			vm.url = Data.url;
	    });

	    vm.click = function(event){

	    }
    };
    
	module.exports = controller;

	
	
});