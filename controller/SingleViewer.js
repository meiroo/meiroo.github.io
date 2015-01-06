define(function(require, exports, module) {

    var angular = require('angular');
    var loader = require('FileLoader');
    
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
    	vm.title = "test";

    	//console.log($routeParams);
    	//contentThumb

    	loader.LoadSingleFile($routeParams.id,function(blog){
            $scope.$apply(function(){
                
                vm.title=getName(blog.name);
                vm.createdAt="2015-1-5";
                vm.filter="Blog";
				vm.contentThumb=blog.content;
                
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