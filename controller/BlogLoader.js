define(function(require, exports, module) {

    var BlogLoader = {};

    BlogLoader.Load= function(callback){
        var arr = [];

        $.when(
            $.get("./static/xuewei.md"), 
            $.get("./static/imageserve.md")
        )
        .done(function(b1,b2){
            arr.push({name:"3D Xuewei",content:b1[0]});
            arr.push({name:"imageserve API",content:b2[0]});
        })
        .then(function(){
            callback(arr);
        });
    }
    
  
	module.exports = BlogLoader;

	
	
});