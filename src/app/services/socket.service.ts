import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from "socket.io-client";

@Injectable()
export class SocketService {

  private socket: any;

  constructor() {

    const token = JSON.parse(localStorage.getItem('currentToken'));
    this.socket = io('http://localhost:3000/',
      { query: 'token=' + JSON.stringify(token) }
    );
    this.socket.on('error', (err: string) => {
      console.log('socket error:', err);
    });
  }

  emit(chanel: string, message: any) { this.socket.emit(chanel, message); }

//   emit(chanel: string, message: any) {
//     return new Observable<any>(observer => {
//       this.socket.emit(chanel, message, function(data) {
//         if (data.success) {
//           observer.next(data.msg);
//         } else {
//           observer.error(data.msg);
//         }
//         observer.complete();
//       });
//     });
//   }
// }
