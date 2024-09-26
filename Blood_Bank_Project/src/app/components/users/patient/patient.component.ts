import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DataRepositoryService } from 'src/app/services/DataRepository.service';
import { Result } from 'src/app/models/Results';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PatientDetails } from 'src/app/models/PatientDetails';
import { BloodGroup } from 'src/app/models/BloodGroup';
import { ApiUrlService } from 'src/app/services/ApiUrls.service';
import { Location } from 'src/app/models/Locations';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  public show: boolean = false;
  patientDetails: PatientDetails = new PatientDetails();
  patientForm: FormGroup;
  patientArray: any[] = [];
  patient_name?: string;
  blood_group?: BloodGroup;
  patient_location?: Location;
 // signUpForm: FormGroup;
  hospital_name?: string;
  contact_number?: number;
  gender?: string;
  age?: number;
  units_required?: number;
  public submitted: boolean = true;
  city: string = "";
  areas: string = "";
  type: string = "";
  result?: Result;
  bid: number | undefined;
  lid: number | undefined;

  patientobj: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private api: ApiUrlService,
    private dataRepository: DataRepositoryService,
    private route: Router
  ) {
    this.patientForm = this.formBuilder.group({
      patient_name: ['', [Validators.required, Validators.minLength(3)]],
      blood_group: ['', Validators.required],
      patient_location: ['', Validators.required],
      hospital_name: ['', [Validators.required, Validators.minLength(4)]],
      contact_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      units_required: ['', Validators.required],
      city: ['', Validators.required],
      area: ['', Validators.required],
      blood_group_type: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get cities() {
    return this.locations
      .map((e) => e.city?.toLocaleUpperCase())
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  get area() {
    return this.locations
      .filter((e) => e.city?.toLocaleLowerCase() == this.patientForm.value.city?.toLocaleLowerCase())
      .map((e) => e.area);
  }

  get locations(): Location[] {
    return this.dataRepository.getLocations();
  }

  filterLocation(city: string, area: string): Location | undefined {
    return this.locations.find((location: Location) => {
      return (
        location.city?.toLocaleLowerCase() === city.toLocaleLowerCase() &&
        location.area?.toLocaleLowerCase() === area.toLocaleLowerCase()
      );
    });
  }

  search() {
    if (this.city != "" && this.areas != "" && this.type != "") {
      this.lid = this.locations
        .filter((e) => e.area?.toLocaleLowerCase() == this.areas?.toLocaleLowerCase())
        .map((e) => e.location_id)[0];
      this.bid = this.dataRepository
        .getBloodGroupType()
        .filter((e) => e.blood_group_type?.toLocaleLowerCase() == this.type?.toLocaleLowerCase())
        .map((e) => e.blood_group_id)[0];
      this.api.getSearch(this.lid!, this.bid!).subscribe((data) => (this.result = data));
    }
  }

  get blood() {
    return this.dataRepository.getBloodGroupType();
  }

  savePatientDetails() {
    if (this.patientForm) {
      const city = this.patientForm.value.city;
      const area = this.patientForm.value.area;
      const bloodGroup = this.patientForm.value.blood_group_type;

      const patientLocation = this.filterLocation(city, area);
      const patientBloodGroup = this.filterGroup(bloodGroup);

      if (patientLocation) {
        this.patientForm.value.patient_location = patientLocation;
        this.patientForm.value.blood_group = patientBloodGroup;
      } else {
        console.log("Patient location is undefined. Unable to save patient details.");
        return;
      }

      Swal.fire({
        title: 'Registration Successful',
        text: 'Your registration has been successful.',
        icon: 'success',
        showCancelButton: true,
        cancelButtonColor: 'red',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.savePatientDetails(this.patientForm.value).subscribe((response) => {
            this.patientobj = response;
            this.route.navigate(['/thanks', this.patientobj.patient_id]);
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.close();
        }
      });
    } else {
      // Invalid form, show error message or handle it accordingly
      console.log('Invalid form');
    }
  }

  filterGroup(bloodGroup: string): BloodGroup | undefined {
    return this.blood.find((group: BloodGroup) => {
      return group.blood_group_type === bloodGroup;
    });
  }

  resetForm() {
    this.patientForm.reset();
  }

  backForm() {
    this.route.navigate(['/login']);
  }
}
