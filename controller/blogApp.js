define(function(require, exports, module) {

    var BlogList = require('controller/BlogList');

    var angular = require('angular');

    var app = angular.module("Blog", ['ngRoute'], function() {
    });



    app.config(function($routeProvider, $locationProvider) {

      $routeProvider
      .when('/about', {
	    templateUrl: 'template/about.html'
	   })
	  .when('/:pathName*', {
	    templateUrl: 'template/imagespace.html',
	    controller: 'ImageSpaceController'
	   })
	  .when('/', {
	    templateUrl: 'template/imagespace.html',
	    controller: 'ImageSpaceController'
	   })
       ;
	   
	});

    app.factory('Data', function() {
	  return {
	  	url:'/',
	  	refresh:0,
	  	itemdelete: null,
	  	forceRefresh:function(){this.refresh++;},
	  	setURL:function(url){
	  		this.url=url;
	  	},
	  	setItemDelete:function(item){this.itemdelete = item;},	  	
	  };
	});



    app.controller('BlogList',BlogList);    
    //app.controller('newfolderController',NewfolderController);
    //app.controller('rmfolderController',RmfolderController);
    //app.controller('ImageSpaceController',ImageSpaceController);

	module.exports = app;



	
	
});

