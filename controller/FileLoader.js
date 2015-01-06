define(function(require, exports, module) {

    var FileLoader = {};

    

    FileLoader.Load= function(callback){
        var arr = [];

        
        
        var path1 = "./static/xuewei.md";
        var path2 = "./static/imageserve.md";
        $.when(
            $.get(path1), 
            $.get(path2)
        )
        .done(function(b1,b2){
            arr.push({name:path1,content:b1[0]});
            arr.push({name:path2,content:b2[0]});
        })
        .then(function(){
            callback(arr);
        });
    }

    FileLoader.LoadSingleFile= function(path,callback){
        var obj = {};
        $.when(
            $.get(path)
        )
        .done(function(data){
            obj.name = path;
            obj.content = data;
        })
        .then(function(){
            callback(obj);
        });
    }
    
  
	module.exports = FileLoader;

	
	
});