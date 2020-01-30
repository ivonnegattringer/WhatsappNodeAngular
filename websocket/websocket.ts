import * as WebSocket from 'ws';
//import http from "https";
import * as axios from 'axios';
import * as http from 'http';
//https://github.com/websockets/ws/tree/master/examples/express-session-parse

const port = 8000;
const wss = new WebSocket.Server({port:port});

let axiosuse = axios.default;

console.log('Server listening on port ' + port);

var allUsers = new Array();

wss.on('connection', function connection(ws) {
  var username:string;
  var password;
  var groups:any = [];
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

          http.get('http://server:2000/get/user/?username='+ username+'&password='+password, async (resp) => {
            await resp.on('data', data => {
                console.log("Successfullly sent keyword-event to Masterservice "+ data);
                if(data) allUsers.push(websocket);
                ws.send(JSON.stringify({type: "login_return", value:data}))
            })

        }).on('error', error => {
            console.error(error);
        });

          break;
        case 'get_groups':

          http.get('http://server:2000/get/groupsOfUser/'+username, async (resp) => {
            await resp.on('data', data => {
              var obj = JSON.parse(data.toString());
              console.log("Succes get groups: " + obj);
              ws.send(JSON.stringify({type: "get_groups", groups: data})); 
              for(let i = 0; i < obj.length; i++){
                console.log(obj[i]);
                groups.push(obj[i]);
                console.log(groups);
              }
              ws.send(JSON.stringify({type: "get_groups", groups: groups}));
            })
          });
          
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
