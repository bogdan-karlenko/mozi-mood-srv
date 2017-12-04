// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { AuthenticationService } from './services/authentication.service';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor(public authService: AuthenticationService) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     return next.handle(req).do((event: HttpEvent<any>) => {
//       if (event instanceof HttpResponse) {
//         // do stuff with response if you want
//       }
//     }, (err: any) => {
//       if (err instanceof HttpErrorResponse) {
//         if (err.status === 401) {
//           this.authService.logOut();
//           // redirect to the login route
//           // or show a modal
//         }
//       }
//     });
//   }
// }
