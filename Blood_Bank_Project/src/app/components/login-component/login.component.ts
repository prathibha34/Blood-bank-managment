import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.component';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from './loginService.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result: any;
  responsedata: any;
  user = {
    email: '',
    password: ''
  };
  isbranch: boolean = false;
  loginForm: FormGroup;
  submitted: boolean = false;


  constructor(private service: AuthService, private route: Router, private loginService: LoginService,private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    localStorage.clear();
  }

  ngOnInit(): void {

  }

    userLogin() {
      this.submitted = true;
      this.loginService.login(this.loginForm.value).subscribe(
      (result: any) => {
        this.responsedata = result;
        console.warn(this.responsedata);
        console.warn(this.responsedata.user.role);
        this.loginService.role(this.responsedata.user.role)
        localStorage.setItem('token', this.responsedata.jwt);
        if (this.responsedata.user.role == 'user') {
          this.route.navigate(['/patientdetails']);
        } else if (this.responsedata.user.role == 'admin') {
          this.route.navigate(['/admin']);
        } else {
          this.route.navigate(['/admin/main/blood/location/', this.responsedata.user.role]);
        }
      },
      (error: any) => { if (error instanceof HttpErrorResponse && error.status === 403) {
        console.error("invalid credentials");
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Credentials',
          text: 'Please try again ! ',
        })
      }
    })
  }

  goBack(): void {
    this.route.navigate(['/home']); // Replace '/' with the appropriate route for the previous page
  }
}
