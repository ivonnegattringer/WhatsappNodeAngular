import * as WebSocket from 'ws';
import * as Http from 'http';
//https://github.com/websockets/ws/tree/master/examples/express-session-parse

const port = 3000;
const server = Http.createServer();
const wss = new WebSocket.Server({noServer: true});

console.log('Server listening on port ' + port);

wss.on('connection', function connection(ws, request, client) {
    ws.on('message', function message(msg) {
      console.log(`Received message ${msg} from user ${client}`);
      boradcast(msg);
    });
  });
  
server.on('upgrade', function upgrade(request, socket, head) {
    authenticate(request, (err, client) => {
      if (err || !client) {
        socket.destroy();
        return;
      }
  
      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request, client);
      });
    });
  });

function boradcast (data: string){
    wss.clients.forEach(client => { 
        if(client.readyState === WebSocket.OPEN) client.send(data);
    });
}

server.listen(port);