define(function(require, exports, module) {

    var API = {};

    API.getLastestCommit = function(repo,callback){
        var url = "https://api.github.com/repos/meiroo/"+repo+"/commits";
        $.get(url).done(function(data){
            if(callback)callback(data[0].sha);
        });
        
    }

    API.getFileList = function(repo,callback){
        API.getLastestCommit(repo,function(sha){
            var url = "https://api.github.com/repos/meiroo/"+repo+"/git/trees/"+sha+"?recursive=1";
            $.get(url).done(function(data){
                //console.log(data);
                if(callback)callback(data.tree);
            });
        })
    }

    API.getFileContent = function(url,callback){
        $.get(url).done(function(data){
            if(callback)callback(data.content);
        });
    }
  
	module.exports = API;

});