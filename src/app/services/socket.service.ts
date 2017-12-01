import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from "socket.io-client";

@Injectable()
export class SocketService {

  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3000', {
      query: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMWU3NjAwZGYyOTgwNmZhMjZhOTVmMSIsImlhdCI6MTUxMjA2MzQxOX0.za_UOX4njC6u0dUanaDDIYIyVqD8E-alE1vsVOgheDo'
      },
      secure: true
    });
    this.socket.on('error', (err: string) => {
      console.log(err);
    });
  }

emit(chanel:string, message:any) {this.socket.emit(chanel, message);}

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
