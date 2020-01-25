import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  websocketURL : string = '';
  
  username : string = '';
  password : string = '';
  groups : string[] = [];
  selectedGroup : string = '';

  hide : boolean = true;
  showInterface : boolean = false;
  websocket : WebSocket;

  gotMessages : Array<string> = [];
  text : string = '';

  connect(){
    this.websocket = new WebSocket(this.websocketURL);
    this.websocket.onopen = (evt) => 'Websocket conected\n';
    this.websocket.onmessage = (evt) => {
      let message  = JSON.parse(evt.data);
      switch(message.type){
        case 'data':
          this.gotMessages.concat(message.message);
          break;
        case 'get_groups':

          this.text = "nice";
          this.groups = message.groups;
          break;
        case 'login_return':
          this.showInterface = message.value;
          break;
        default:
          this.text = "default";
          break;
      }
    }
  }
  
  disconnect(){
    this.websocket.close();
  }

  send(){
    this.websocket.send(`{"type": "data", "message": "${this.text}"`);
  }

  sendUserCredentials(){
    this.websocket.send(`{"type": "login", "username": "${this.username}", "password":"${this.password}"}`);

    this.websocket.send('{"type": "get_groups"}');
  }

  groupChanged(){
    
    this.websocket.send(`{"type": "change_group", "group": "${this.selectedGroup}"`);
  }

}
