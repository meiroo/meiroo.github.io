define(function(require, exports, module) {

    var ViewerList = require('ViewerList');
    var SingleViewer = require('SingleViewer');

    var angular = require('angular');

    var app = angular.module("Viewer", ['ngRoute','btford.markdown'], function() {
    });



    app.config(function($routeProvider, $locationProvider) {

      $routeProvider
      .when('/', {
	    templateUrl: 'template/ViewerList.html',
	    controller: 'ViewerList'
	   })
      .when('/repo/:repo/', {
	    templateUrl: 'template/ViewerList.html',
	    controller: 'ViewerList'
	   })
      .when('/repo/:repo/path/:path*', {
	    templateUrl: 'template/SingleViewer.html',
	    controller: 'SingleViewer'
	   });
	   
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



    app.controller('ViewerList',ViewerList);
    app.controller('SingleViewer',SingleViewer);    


	module.exports = app;



	
	
});

