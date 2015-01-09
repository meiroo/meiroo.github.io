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
            //console.log(url);
            $.get(url).done(function(data){
                //console.log(data);
                if(callback)callback(data.tree);
            });
        })
    }

    API.getFileContent = function(repo,path,callback){
        $.get('https://api.github.com/repos/meiroo/'+repo+'/contents/'+path).done(function(data){
            if(callback)callback(data.content);
        });
    }

    API.WriteFile = function(repo,path,content,password,callback){
        console.log(content);

        $.ajax({
            url: 'http://meiroo.duapp.com/api/github/write',
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,  
            jsonp: 'jsoncallback',
            data: {
                repo: repo,
                path: path,
                content:encodeURIComponent(content),
                password:password,
                commitlog:'Commit From Repository Viewer : api v3'
            },
        })
        .done(function(data) {
            console.log(data);
            if(callback)callback(null,data);
        })
        .fail(function(err,err2) {
            if(callback)callback(err2,null);
        })
        .always(function() {
            console.log("complete");
        });
        
    }
  
	module.exports = API;

});