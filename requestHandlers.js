var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response){
  console.log("start is request")
  
  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload"  enctype="multipart/form-data" '+
  'method="post">'+
  '<input type="file" name="upload" multiple="multiple">'+
  '<input type="submit" value="Upload file" />'+
  '</form>'+
  '</body>'+
  '</html>';
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();

}

function upload(response, request){
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, field, files){
    fs.renameSync(files.upload.path, /tmp/test.png"")
  });
  response.writeHead(200, {"Content-Type" : "text/html"});
  response.write("received image: <br/>");
  response.write("<img src='/show' />")
  response.end();
}

function show(response){
  fs.readFile("/tmp/test.png", "binary", function(error, file){
    if(error){
      response.writeHead(500, {"Content-Type":"text/plain"});
      response.write(error + "\n");
      response.end();
    }else{
      response.writeHead(200, {"Content-Type":"image/png"});
      response.write(file, "binary");
      response.end();
    }
  })
}

exports.start = start;
exports.upload = upload;
exports.show = show;