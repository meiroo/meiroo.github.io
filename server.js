var http = require('http'),
    fs = require('fs'),
    url = require('url'),   
    mime = require('./mime');
    path = require('path');
    var http=require('http');
    var qs=require('querystring');
 

var port = 8081;

function processStatic(request, response){
    //get path from request's url
    var urldata = url.parse(request.url,true);
    var urlpath = urldata.pathname;
    var urlquery = urldata.query;
    //console.log(urldata);
    //map the path to server path
    if(urlpath == '/')
    	urlpath = '/index.html';

    var absPath = __dirname + "/" + urlpath;
    //console.log(absPath);

    //test whether the file is exists first
    path.exists(absPath, function(exists) {
        if(exists) {
            //if ok
            var ext = path.extname(urlpath);
	        ext = ext ? ext.slice(1) : 'unknown';
	        var contentType = mime.types[ext] || "text/plain";	            
	        response.writeHead(200,{'Content-Type':contentType});
	          
            var r = fs.createReadStream(absPath);
			r.pipe(response);

        } else {
            response.end('404 File not found.');
        }

    });
};


function processQuery(request, response){
    //get path from request's url
    var urldata = url.parse(request.url,true);
    var urlpath = urldata.pathname;
    var urlquery = urldata.query;
    console.log(urlquery.code);
    if(urlpath=="/AuthorizeGitHub1"){
        var post_data={code:urlquery.code,client_id:'9b17be9d59549abec615',client_secret:'33d680936fafbe11d1b047175a5620dedaba2a64'};//这是需要提交的数据
        var content=qs.stringify(post_data);


        var options = {
          host: 'github.com',
          port: 80,
          path: '/login/oauth/access_token',
          method: 'POST',
          headers:{
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
          'Content-Length':content.length,
          'Connection':'keep-alive',
          'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp'
          }
        };
        //console.log("post options:\n",options);
        //console.log("content:",content);
        //console.log("\n");
         
        var req = http.request(options, function(res) {
          //console.log("statusCode: ", res.statusCode);
          //console.log("headers: ", res.headers);
          var _data='';
          res.on('data', function(chunk){
             _data += chunk;
          });
          res.on('end', function(){
             console.log("--->>result:"+_data)
             response.end(_data);
           });
        });
        req.write(content);        
        req.end();
        
    }else
       processStatic(request,response);
   
};


var server =http.createServer();
server.listen(port);
server.on('request',processQuery);

console.log('Server running at http://127.0.0.1:8081/');