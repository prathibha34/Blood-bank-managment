import { LoginService } from './../../login-component/loginService.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CookieService } from 'ngx-cookie-service';
import { DataRepositoryService } from 'src/app/services/DataRepository.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.css'],
})
export class AddDonorComponent implements OnInit {
  donorForm: FormGroup;
  bloodBank: any;
  today: Date | undefined;
  maxDate: Date | null | any;
  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private dataRepo:DataRepositoryService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private cookieService: CookieService
  ) {
    console.log('AddDonorComponent constructor');
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set the expiration time to 7 days from now

    const bloodBankCookieExists = this.cookieService.check('blood_Bank');
    if (!bloodBankCookieExists) {
      this.cookieService.set('blood_Bank', this.loginService.resposedata, expirationDate);
    }

    const desiredCookie = this.cookieService.get('blood_Bank');
    this.bloodBank = desiredCookie ? desiredCookie : null;


    this.donorForm = this.formBuilder.group({
      donar_name: ['', [Validators.required, Validators.minLength(4)]],
      blood_type: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      gender: ['', Validators.required],
      aadhar_number: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      transfusion_date: [null, [Validators.required]],
      bloodBank: [this.bloodBank, Validators.required],
      units: ['', [Validators.required, Validators.min(1)]],
      contact_number: ['', Validators.pattern('[6-9][0-9]{9}')],
      eligibility: ['', Validators.required],
      // location: ['', Validators.required]
    });
    // this.setMinMaxDate();
  }

  ngOnInit(): void {}

  submitForm() {
    const selectedDate: Date = this.donorForm.value.transfusion_date;
    const timeZoneOffset = selectedDate.getTimezoneOffset() * 60000; // Get time zone offset in milliseconds
    const formattedDate: string = new Date(selectedDate.getTime() - timeZoneOffset)
      .toISOString()
      .split("T")[0];

    const formValue = {
      ...this.donorForm.value,
      transfusion_date: formattedDate,
      bank: {
        blood_bank_id: this.bloodbanks[0].blood_bank_id,
        blood_bank_name: this.bloodbanks[0].blood_bank_name,
        location: this.bloodbanks[0].location
      },
      location: this.bloodbanks[0].location,
      eligibility: 'yes'
    };
    console.log(formValue);
    this.dataRepo.bloodDonation(formValue);
  }




getbloodBanks()
{
  return this.dataRepo.getbloodBanks()
}
get bloodbanks()
{
  const bank= this.getbloodBanks().filter(e=>e.location?.area==this.bloodBank).map(e=>e)
  return bank
}
  get blood()
  {
    return this.dataRepo.getBloodGroupType()
  }
  // setMinMaxDate() {
  //   this.today = new Date();
  //   this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1);

  //   this.donorForm.get('transfusion_date')?.setValidators([Validators.required]);
  //   this.donorForm.get('transfusion_date')?.updateValueAndValidity();
  // }

  // get minDate(): Date | null {
  //   const transfusionDate = this.donorForm.get('transfusion_date')?.value;
  //   return transfusionDate ? new Date(transfusionDate) : null;
  // }

  // dateFilter = (date: Date | null): boolean => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  //   if (date) {
  //     const selectedDate = new Date(date);
  //     selectedDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  //     return selectedDate >= today;
  //   }

  //   return false;
  // };

  // onDatepickerOpen(picker: any): void {
  //   if (picker && picker._datepickerInput) {
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  //     picker._datepickerInput.min = today;
  //   }
  // }

  // formatDate(event: MatDatepickerInputEvent<Date>): void {
  //   const formattedDate = event.value ? this.datePipe.transform(event.value, 'yyyy-MM-dd') : null;
  //   this.donorForm.get('transfusion_date')?.setValue(formattedDate);
  // }
}
