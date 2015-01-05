define(function(require, exports, module) {

    var angular = require('angular');
    var loader = require('BlogLoader');


    
    
    var controller = function($scope,Data,$location){
    	$scope.Data = Data;
    	var vm = $scope;
    	vm.array = [];
        loader.Load(function(arr){
            $scope.$apply(function(){
                for(var i = 0; i< arr.length; i++){
                    var blog = arr[i];
                    vm.array.push({
                        id:blog.name,
                        title:blog.name,
                        createdAt:"2015-1-5",
                        filter:"Blog",
                        contentThumb:blog.content,
                    })
                }
            });
        });
    	

    	console.log('title controller...');

	    vm.$watchCollection('Data.url', function() {
			vm.url = Data.url;
	    });

	    vm.click = function(event){

	    }
    };
    
	module.exports = controller;

	
	
});