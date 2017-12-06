import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, forwardRef, Injector } from '@angular/core';
import 'rxjs/add/operator/do';

const AuthServiceFwd = forwardRef(() => AuthenticationService);

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log('intercepted');
          const authService = this.injector.get(AuthenticationService);
          authService.logOut();
          console.log('end of interception');
        }
      }
    });
  }
}
