import { AuthService, } from 'src/app/services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);

    let jwt = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authService.GetToken() // Add a space after 'Bearer'
      }
    });

    return next.handle(jwt);
  }
}



