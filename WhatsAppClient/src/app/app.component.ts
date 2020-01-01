import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  websocketURL : string = '';
  user : string = '';
  password : string = '';

  websocket : WebSocket;

  text : string = '';

  connect(){
    this.websocket = new WebSocket(this.websocketURL);

    //this.websocket.onopen = (evt) => this.receiveText += 'Websocket'
  }
  
  disconnect(){
    this.websocket.close();
  }

  send(){
    this.websocket.send(this.text);
  }


}
