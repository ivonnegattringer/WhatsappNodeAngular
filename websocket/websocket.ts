import * as WebSocket from 'ws';
//import http from "https";
import * as axios from 'axios';
//https://github.com/websockets/ws/tree/master/examples/express-session-parse

const port = 8000;
const wss = new WebSocket.Server({port:port});
let groups = ["linguee", "linda", "rida"];

let axiosuse = axios.default;

console.log('Server listening on port ' + port);

var allUsers = new Array();

wss.on('connection', function connection(ws) {
  var username:string;
  var password;
  var websocket = {socket: ws, joinedGroup: ''};
    ws.on('message', data=> {
      let message = JSON.parse(data.toString());
      console.log(data);
      switch(message.type){
        case 'data':
          var rep = username + ": "+ message.message;
          boradcast(rep, websocket.joinedGroup);
          break;
        case 'login':
          username = message.username;
          password = message.password;

          let correct = false;

          axiosuse.get('http://localhost:2000/get/user/?username='+ username+'&password='+password)
                .then(response=> {
                  console.log("fuck");
                  console.log("first login response: "+ response);
                });
          
          //https://www.npmjs.com/package/axios
          //https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/

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

function removeClient(ws:any){
  for(let i = 0; i < allUsers.length; i++){
    if(allUsers[i].socket === ws){
      allUsers.splice(i,1);
      console.log('remove client');
    }
  }
}

function getWebsocket(ws:any){
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