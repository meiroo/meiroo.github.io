define(function(require, exports, module) {

    var angular = require('angular');
    
    
    var controller = function($scope,Data,$location){
    	$scope.Data = Data;
    	var vm = $scope;
    	vm.title = "test";

	    vm.$watchCollection('Data.url', function() {
			vm.url = Data.url;
	    });

	    vm.click = function(event){

	    }
    };
    
	module.exports = controller;

	
	
});