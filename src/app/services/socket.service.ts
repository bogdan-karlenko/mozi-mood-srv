import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from "socket.io-client";

@Injectable()
export class SocketService {

  private socket: any;

  constructor() {
    this.socket = io('http://localhost:8011');
    // this.socket.on("connect", () => this.connected());
    // this.socket.on("disconnect", () => this.disconnected());
    this.socket.on('error', (err: string) => {
      console.log(err);
    });
  }

  connect() {
    this.socket.connect();
  }
  disconnect() {
    this.socket.disconnect();
  }

  emit(chanel: string, message: any) {
    return new Observable<any>(observer => {
      this.socket.emit(chanel, message, function(data) {
        if (data.success) {
          observer.next(data.msg);
        } else {
          observer.error(data.msg);
        }
        observer.complete();
      });
    });
  }
}
