define(function(require, exports, module) {

    var angular = require('angular');
    
    
    var controller = function($scope,Data,$location){
    	alert('controller');
    	$scope.Data = Data;
    	var vm = $scope;
    	vm.title = 'Blog1';

    	console.log('title controller...');

	    vm.$watchCollection('Data.url', function() {
			vm.url = Data.url;
	    });

	    vm.click = function(event){

	    }
    };
    
	module.exports = controller;

	
	
});