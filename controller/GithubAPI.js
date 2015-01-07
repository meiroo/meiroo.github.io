define(function(require, exports, module) {

    var API = {};

    API.getLastestCommit = function(repo,callback){
        var url = "https://api.github.com/repos/meiroo/"+repo+"/commits";
        $.get(url).done(function(data){
            if(callback)callback(data[0].sha);
        });
        
    }
    API.updateFileTest = function(repo,callback){
        $.ajax({
            url: 'https://api.github.com/repos/meiroo/javascript/contents/readme.md',
            type: 'PUT',
            data: {
            "access_token":"b2249996b9bf8995fd6bcc44a13551d94273770b",
              "message": "commit from repository viewer",
              "committer": {
                "name": "meiroo",
                "email": "meiroo@outlook.com"
              },
              "content": "bXkgbmV3IGZpbGUgY29udGVudHM=",
              "sha":"d011c936f4a8dee22c6dd3c7224ffeffbebb7572"
            },
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.error("error");
        })
        .always(function() {
            console.log("complete");
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