import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class LoginService {

  resposedata:string=''
  constructor(private authService: AuthService) {
    
  }

  login(user: any): Observable<any> {

    return this.authService.Login(user);
  }

  role(data:any)
  {

    this.resposedata=data
    console.log(this.resposedata+'----------')
  }

}

