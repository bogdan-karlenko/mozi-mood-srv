import { HttpRequest, HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let cloneReq: HttpRequest<any>;

    const currentToken = localStorage.getItem('currentToken');

    if (currentToken) {
      const token = currentToken.split('"').join('');
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      cloneReq = req.clone({headers});
      console.log(cloneReq.headers);
    } else {
      cloneReq = req;
    }

    return next.handle(cloneReq).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          const authService = this.injector.get(AuthenticationService);
          authService.logOut();
        }
      }
    });
  }
}
