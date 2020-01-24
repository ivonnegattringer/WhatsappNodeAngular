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

  hide : boolean = true;
  websocket : WebSocket;

  gotMessages : Array<string> = [];
  text : string = '';

  connect(){
    this.websocket = new WebSocket(this.websocketURL);
    this.websocket.onopen = (evt) => 'Websocket conected\n'
      this.websocket.onmessage = (evt) => {
        let message  = JSON.parse(evt.data);
        switch(message.type){
          case 'data':
            this.gotMessages.push(message);
        }
      }
  }
  
  disconnect(){
    this.websocket.close();
  }

  send(){
    this.websocket.send(this.text);
  }

  sendUserCredentials(){
    let json = JSON.parse(`{"type": "login", "username": "${this.username}", "password":"${this.password}"}`);
    this.websocket.send(json);
  }

}
