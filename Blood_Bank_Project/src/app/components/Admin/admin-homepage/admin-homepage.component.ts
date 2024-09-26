import { LoginComponent } from './../../login-component/login.component';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login-component/loginService.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css'],
})
export class AdminHomepageComponent implements OnInit {
  role: string | null = '';
  isSideNavOpened: boolean = false;
  isAdmin:boolean=false
  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private loginService:LoginService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {



  }

  toggleSideNav() {
    this.isSideNavOpened = !this.isSideNavOpened;

   if(this.loginService.resposedata.toLocaleUpperCase()=='ADMIN')
   {
console.log()
    this.isAdmin=true
   }

  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

  adminRole() {
    // Implement your logic for admin role here
  }
}
