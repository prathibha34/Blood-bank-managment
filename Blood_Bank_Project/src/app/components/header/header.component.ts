import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

isLogin=this.service.isLogin()
  constructor(private service:AuthService,private route:Router) { }

  ngOnInit(): void {
  }

  logout()
  {
      localStorage.removeItem('token')
      this.route.navigate(['/login'])
  }
}
