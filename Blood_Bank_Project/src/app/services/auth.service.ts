import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  apiurl = `http://localhost:8000/api/login/`;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  Login(userDetails: any): Observable<User> {
    return this.http.post<User>(this.apiurl, userDetails);
  }

  isLogin() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const isExpired = this.jwtHelper.isTokenExpired(token);
        if (isExpired) {
          console.log(isExpired);
          this.logout(); // Call the logout method
          return false;
        }

        const decodedToken = this.jwtHelper.decodeToken(token);
        console.log(decodedToken);
        return true;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('Token is null');
    }

    return false;
  }

  logout() {
    // Clear the token from localStorage or perform any other necessary logout actions
    localStorage.removeItem('token');
  }
  GetToken() {
    return localStorage.getItem('token') || '';
  }
}
