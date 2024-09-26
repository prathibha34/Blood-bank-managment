import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DataRepositoryService } from 'src/app/services/DataRepository.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  ngOnInit(): void {
  }

  user = {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    confirmPassword: null,
  };

  submitted : boolean=false

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataRepo:DataRepositoryService) {
    this.registrationForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.pattern( /^\S*$/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator('password','confirmPassword') });
  }


  submitForm() {
    const formValues = this.registrationForm.value;
    this.submitted = true;
    console.log(formValues);
    if (this.registrationForm.invalid) {
      console.log("hello form invalid")
      return;
    }
    if(this.submitted == true){
      console.log("hello form valid")
      this.dataRepo.registeration(formValues);
    }
  }

  onlyAlphabetsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const alphabetsOnlyRegex = /^[A-Za-z]+$/;

      if (!alphabetsOnlyRegex.test(value)) {
        return { 'onlyAlphabets': true };
      }

      return null;
    };
  }

  passwordMatchValidator(passwordField : string, confirmPasswordField : string){
    return (group: FormGroup) => {
      let password = group.controls[passwordField];
      let confirmPassword = group.controls[confirmPasswordField];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      }
    }
  }
}
