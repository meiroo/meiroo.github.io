'use strict';

require.config({
    baseUrl: '',
    paths: {
        angular: "js/angular",
        "angular-route": "js/angular-route",
        "angular-sanitize":"js/angular-sanitize",
        "showdown":"js/showdown",
        "markdown":"js/markdown",
        "blogApp":'controller/blogApp',
        'BlogList':'controller/BlogList',

    },
    shim: {
        angular: {
            exports: "angular"
        },
        "angular-route":{
            exports:"angular-route",
            deps: ["angular"]
        },
        "angular-sanitize":{
            exports:"angular-sanitize",
            deps: ["angular"]
        },
        "showdown":{
            exports:"showdown",
            deps: ["angular"]
        },
        "markdown":{
            exports:"markdown",
            deps: ["angular"]
        },
      

    }
});

window.name = "NG_DEFER_BOOTSTRAP!";

$(document).ready(function() {

    require(['angular','angular-route','angular-sanitize','showdown','markdown','blogApp'],function(angular,route,s,sd,md,app){
        
        var $html = angular.element(document.getElementsByTagName('html')[0]);
        angular.element().ready(function() {
            angular.resumeBootstrap([app['name']]);
        });
    });
});