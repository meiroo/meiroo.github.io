define(function(require, exports, module) {

    var angular = require('angular');
    var loader = require('FileLoader');
    var api = require('GithubAPI');

    var controller = function($scope,Data,$routeParams,$location){
    	$scope.Data = Data;
    	var vm = $scope;
        vm.title = "";
        vm.console = "";
        var editor = null;

    	//console.log($routeParams);
    	//contentThumb

    	/*loader.LoadSingleFile($routeParams.id,function(blog){
            $scope.$apply(function(){
                
                vm.title=getName(blog.name);
                vm.createdAt="2015-1-5";
                vm.filter="Blog";
				vm.contentThumb=blog.content;
                
            });
        });*/

		api.getFileContent($routeParams.url,function(content){
			//console.log(content);
			// /content = window.atob(content);
			content = decodeURIComponent(escape(window.atob(content)));
            vm.src = content;
			//console.log(content);
            $scope.$apply(function(){
                vm.title=$routeParams.name;

                editor = CodeMirror(document.getElementById("code"), {
                  value: vm.src,
                  lineNumbers: true,
                  mode: "javascript",
                  keyMap: "sublime",
                  autoCloseBrackets: true,
                  matchBrackets: true,
                  showCursorWhenSelecting: true,
                  theme: "monokai"
                });


                if(vm.title.match(/.*\.md/gi)){
                	vm.content= vm.src;
                    vm.src = "";
                    vm.edit = false;
                    $("#code").hide();
                }else{
                    vm.content = "";
                    vm.edit = true;
                } 
            });

        });

        

        vm.onClick = function(event){
            if(editor){
                vm.src = editor.getValue();
            }
            var console = {};
            console.log = function(str){
                vm.console += str + "\n";
            }
            eval(vm.src);
        }

        vm.onClear = function(event){
            vm.console = "";
        }

	    vm.$watchCollection('edit', function() {
			if(vm.title.match(/.*\.md/gi)){
                vm.edit= false;
            }else{
                //vm.content= '<pre>'+vm.src+'</pre>';
            }
	    });
    };
    
	module.exports = controller;

	
	
});