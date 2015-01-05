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
	    	var current_url = vm.url;
			if(current_url!='/'){
				var index = current_url.lastIndexOf('/');
				current_url = current_url.substring(0,index);
				if(current_url=='')
					current_url = '/';
				//Data.setURL(current_url);
				$location.path(current_url);
			}	
	    }
    };
    
	module.exports = controller;

	
	
});