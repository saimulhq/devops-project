var http = require("http");

var port = 8080;

var server = http.createServer();

// gets the remote and local address of service 2
server.on("request", function (request, response) {
    response.writeHead(200);
    response.write("Service 2\n");
    response.write("Hello from " + request.client.remoteAddress + ":" + request.client.remotePort + "\n" + "to " + request.client.localAddress + ":" + request.client.localPort + "\n");
    response.end();
});

server.listen(port);
console.log("Running on http://localhost:" + port);