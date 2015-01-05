'use strict';

require.config({
    baseUrl: '',
    paths: {
        angular: "js/angular",
        "angular-route": "js/angular-route",
        "app":'controller/blogApp',

    },
    shim: {
        angular: {
            exports: "angular"
        },
        "angular-route":{
            exports:"angular-route",
            deps: ["angular"]
        }
      

    }
});

window.name = "NG_DEFER_BOOTSTRAP!";

$(document).ready(function() {

    require(['angular','angular-route','app'],function(angular,route,app){
        
        var $html = angular.element(document.getElementsByTagName('html')[0]);
        angular.element().ready(function() {
            angular.resumeBootstrap([app['name']]);
        });
    });
});