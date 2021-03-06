// server.js
var uuid = require('node-uuid');
const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        let messageparsed = (JSON.parse(message));
          // if no username change
          if (messageparsed.postNotification === undefined) {
            messageparsed.id = uuid.v1();
            messageparsed.usercount = wss.clients.size;
            messageparsed.type = "incomingMessage";
            let messagewithid = (JSON.stringify(messageparsed));
            client.send(messagewithid);
        }
      }
    });
  });

  // the code updates usercount for when a user closes his browser
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      let messagewithid = {usercount: wss.clients.size, id: uuid.v4()};
      client.send(JSON.stringify(messagewithid));
    }
  }));


});

