import * as WebSocket from 'ws';
import * as Http from 'http';
//https://github.com/websockets/ws/tree/master/examples/express-session-parse

const port = 8000;
const wss = new WebSocket.Server({port:port});
let groups = {"groups": ["linguee", "linda", "rida"]};


console.log('Server listening on port ' + port);

var allUsers = new Array();

wss.on('connection', function connection(ws) {
  var username;
  var password;
  var websocket = {socket: ws, joinedGroup: ''};
    ws.on('message', data=> {
      let message = JSON.parse(data.toString());
      console.log(data);
      switch(message.type){
        case 'data':
          var rep = username + " "+ message.message;
          boradcast(rep, websocket.joinedGroup);
          break;
        case 'login':
          username = message.username;
          password = message.password;
          
          allUsers.push(websocket);
          console.log(allUsers.length);
          ws.send(JSON.stringify({type: "login_return", value:true}))
          break;
        case 'get_groups':
          ws.send(JSON.stringify({type: "get_groups", groups: groups}));   

          break;
        case 'change_group':
          websocket.joinedGroup = message.group;
          break;
        default:
          ws.send(JSON.stringify({type:"data", message:'yikes'}));
          break;
      }
    });
    ws.on('close', function() {
      removeClient(ws);
    });
  });

function removeClient(ws){
  for(let i = 0; i < allUsers.length; i++){
    if(allUsers[i].socket === ws){
      allUsers.splice(i,1);
      console.log('remove client');
    }
  }
}

function getWebsocket(ws){
  for(let i = 0; i < allUsers.length; i++){
    if(allUsers[i].socket === ws){
      return allUsers[i];
    }
  }
}

function boradcast (data: string, activegroup:string){
    
    allUsers.forEach(josh =>{
      //console.log(josh.joinedGroup +" "+ activegroup);
      if(josh.socket.readyState == WebSocket.OPEN && activegroup.localeCompare(josh.joinedGroup) == 0 && activegroup != ''){
        josh.socket.send(JSON.stringify({type:"data", message: data}));
      }
    })
}
