define(function(require, exports, module) {

    var angular = require('angular');
    
    
    var controller = function($scope,Data,$location){
    	$scope.Data = Data;
    	var vm = $scope;
    	vm.array = [];
    	vm.array.push({
    		id:"1",
    		title:"Blog1",
    		createdAt:"2015-1-5",
    		filter:"Test",
    		contentThumb:"简单介绍。。。。",
    	})

    	vm.array.push({
    		id:"2",
    		title:"Blog2",
    		createdAt:"2015-1-5",
    		filter:"Test",
    		contentThumb:"简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。",
    	})

    	vm.array.push({
    		id:"3",
    		title:"Blog2",
    		createdAt:"2015-1-5",
    		filter:"Test",
    		contentThumb:"简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。简单介绍。。。。",
    	})

    	console.log('title controller...');

	    vm.$watchCollection('Data.url', function() {
			vm.url = Data.url;
	    });

	    vm.click = function(event){

	    }
    };
    
	module.exports = controller;

	
	
});