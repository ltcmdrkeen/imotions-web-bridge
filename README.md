# iMotions-Web-Bridge

iMotions currently has no possibility to directly connect to it's event API from a web browser, as web browser cannot connect to UDP/TCP sockets but only to websockets.

- This small node script allows you to send events from a web browser
- It sets up a websocket server which bridges events from a websocket-client to the iMotions event API
- The Python Example of iMotions (https://help.imotions.com/hc/en-us/articles/206936449-Simple-Python-Example-Input-data-to-iMotions-from-Python-3-5-Script) is re-built in the web client example
- Make sure to define your incoming events in iMotions (using eventDefinition.xml for this example)


---

- Steps to send events:
	- Install Node.js from https://nodejs.org/en/download/ and run `npm install`
	- Adapt the index.js variables `HOST` and `PORT` to your iMotions setup (defaults should be fine)
	- Start the bridge server with `node index.js`
	- That's it! Connect from a web client and send events.

## Example web client code

```javascript

  // Creating websocket object depending on mozilla usage
  window.WebSocket = window.WebSocket || 	 window.MozWebSocket;

  // Connect to node websocket server
  var connection = new WebSocket('ws://127.0.0.1:1337');
  connection.onopen = function () {
    console.log("connection to iMotion node bridge ready");
    // Do the same as in the iMotions tutorial
    for(var i=0;i<100;i++){
      setTimeout(function(ws,i){
        iMotionsEvent="E;1;EventSourceId;1;0.0;;;SampleId;" + i + ";" + i/10 + "\r\n"
        ws.send(iMotionsEvent);
      },i*500,connection,i);
    }

  };
  connection.onerror = function (error) {
    console.log("Error while connecting to iMotions node bridge")
  };

```
