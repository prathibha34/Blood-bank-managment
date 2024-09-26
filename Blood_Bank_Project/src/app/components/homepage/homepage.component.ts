import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.component';
import { ApiUrlService } from 'src/app/services/ApiUrls.service';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { LoginService } from '../login-component/loginService.service';
@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
details:User[]=[]
  constructor(private api:ApiUrlService,private route:Router,) {
    this.getusers()
   }

  ngOnInit(): void {
  }

  getusers()
  {
      return this.api.getUsers().subscribe(data=>this.details=data)

  }

  get users()
  {
    console.warn(this.details)
    return this.details
  }

  requestblood()
  {
    this.route.navigate(['/requestblood']);
  }

}
