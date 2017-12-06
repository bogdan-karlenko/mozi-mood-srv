import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from "socket.io-client";

@Injectable()
export class SocketService {

  private socket: any;
  private isRunning: boolean;

  constructor() {
  }

  setRunning = (state) => { this.isRunning = state; }

  connect = () => {
    const token = JSON.parse(localStorage.getItem('currentToken'));
    this.socket = io('http://localhost:3000/',
      { query: `token=Bearer ${token}` }
    );
    this.socket.on('error', (err: string) => {
      console.log('socket error:', err);
    });
    this.setRunning(true);
    return this.socket;
  }

  disconnect = () => {
    if (this.isRunning) {
      this.socket.disconnect();
      this.setRunning(false);
    }
  }

  emit(chanel: string, message: any) {
    this.socket.emit(chanel, message);
    //const token = JSON.parse(localStorage.getItem('currentToken'));
    //this.socket.emit(chanel, `token=Bearer ${message}`);
  }
}
