var http = require('http');

// Handle user request
function onRequest(request, response){

  if(request.method == 'GET' && request.url == '/home'){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Welcome to the Home Page");
    response.end();
  }else if (request.method == 'GET' && request.url == '/getData') {
    response.writeHead(200, {"Content-Type": "text/JSON"});
    response.write("{\"name\":\"Jonah\",\"class\":\"cs313\"}")
    response.end();
  }
  else{
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("Error: 404 Page Not Found</h1>")
    response.end();
  }
};

http.createServer(onRequest).listen(8888);
console.log('listening to port 8888');
