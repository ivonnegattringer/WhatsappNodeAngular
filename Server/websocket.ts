import * as WebSocket from 'ws';
import * as Http from 'http';
//https://github.com/websockets/ws/tree/master/examples/express-session-parse

const port = 8000;
const wss = new WebSocket.Server({port:port});


console.log('Server listening on port ' + port);

wss.on('connection', function connection(ws, request,client) {
    ws.on('message', data=> {
      let message = JSON.parse(data);
      //console.log(request);
      console.log(request);
      
      switch(message.type){
        case 'data':
          var rep = ws.client + " "+ message.message;
          ws.send(rep);
          //console.log(client + " "+ message.message)
          console.log("got here hell yeah")
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
