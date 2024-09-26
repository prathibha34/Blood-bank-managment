import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service:AuthService, private route:Router)
  {}
  canActivate()
  {
     if(this.service.isLogin())
     {
       return true;
     }
     else
     {
      this.route.navigate(['login'])
      return false;
     }
  }



}
