// iMotions UDP API config:
var PORT = 8089;
var HOST = '127.0.0.1';

// HTTP port:
var HTTPPORT = 1337;

var dgram = require('dgram');
var http = require('http');
var WebSocketServer = require('websocket').server;
var iMotionsClient = dgram.createSocket('udp4');

var server = http.createServer(function(request, response) {
  // just for handling websockets
});
server.listen(1337, function() { });

// create the websocket server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket event handling
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  connection.on('message', function(message) {

    if (message.type === 'utf8') {
      console.log("Received from webclient: "+message.utf8Data);
      // create bytes object and send to iMotions
      buffer = Buffer(message.utf8Data,"utf8");
      iMotionsClient.send(buffer, PORT, HOST, function(err, bytes) {
          if (err) throw err;
          console.log('Bridged to iMotions: ' + HOST +':'+ PORT);
      });
    }else{
      console.log("Warning, received non-utf8 data. Messages have to be utf8 encoded.");
    }
  });

  connection.on('close', function(connection) {
  });
});
