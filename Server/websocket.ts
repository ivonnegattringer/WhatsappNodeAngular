import * as WebSocket from 'ws';
import * as Http from 'http';
//https://github.com/websockets/ws/tree/master/examples/express-session-parse

const port = 8000;
const server = Http.createServer();
const wss = new WebSocket.Server({noServer: true});


console.log('Server listening on port ' + port);

wss.on('connection', function connection(ws, request, client) {
    ws.on('message', data=> {
      let message = JSON.parse(data);
      switch(message.type){
        case 'data':
          ws.send({type: 'data', reply: 'i got a reakin message u stupid kiddo'});
          break;
        default:
          ws.send('yikes');
          break;
      }
    });
  });

/*function boradcast (data: string){
    wss.clients.forEach(client => { 
        if(client.readyState === WebSocket.OPEN) client.send(data);
    });
}*/

server.listen(port);