define(function(require, exports, module) {

    var BlogList = require('BlogList');
    var SingleBlog = require('SingleBlog');

    var angular = require('angular');

    var app = angular.module("Blog", ['ngRoute','btford.markdown'], function() {
    });



    app.config(function($routeProvider, $locationProvider) {

      $routeProvider
      .when('/blog/:name', {
	    templateUrl: 'template/singleBlog.html',
	    controller: 'SingleBlog'
	   })
      .when('/', {
	    templateUrl: 'template/blogList.html',
	    controller: 'BlogList'
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

