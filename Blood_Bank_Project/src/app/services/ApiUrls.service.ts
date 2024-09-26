import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.component';
import { Location } from '../models/Locations';
import { TotalUnits } from '../models/TotalUnits';
import { DonorDetails } from '../models/DonorDetails';
import { BloodGroup } from '../models/BloodGroup';
import { Result } from '../models/Results';
import { BloodBank } from '../models/BloodBank';
import { PatientDetails } from '../models/PatientDetails';

@Injectable()
export class ApiUrlService {
  url: string = `http://127.0.0.1:8000`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/api/login/`);
  }

  register(register:User): Observable<User> {
    return this.http.post<User>('http://localhost:8000/api/create/registerdetails/', register);
  }

  getLocations():Observable<Location[]>
  {
    return this.http.get<Location[]>(`http://localhost:8000/api/getall/location/`)
  }

  getBloodType(id:number):Observable<TotalUnits[]>
  {
    console.warn(id)
    return this.http.get<TotalUnits[]>(`http://localhost:8000/api/get/bloodgroup/location/${id}/`)
  }

  getPendingPatients():Observable<any>
  {
    return this.http.get<any>(`http://localhost:8000/api/request/currentday/patientdetails/`)
  }

  getAcceptedPatients():Observable<any>
  {
    return this.http.get(`http://localhost:8000/api/accept/currentday/patientdetails/`)
  }
  getDonarsdetails():Observable<DonorDetails[]>
  {
    return this.http.get<DonorDetails[]>(`http://localhost:8000/api/getall/donordetails/`)
  }
  getcurrentDayDonardetails():Observable<DonorDetails[]>
  {
    return this.http.get<DonorDetails[]>(`http://localhost:8000/api/currentday/donordetails/`)
  }
getCurrentAllPatients():Observable<PatientDetails[]>
{
    return this.http.get<PatientDetails[]>(`http://localhost:8000/api/getall/request/currentday/patientdetails/`)
}
  getBloodGroupType(): Observable<BloodGroup[]>{
    return this.http.get<BloodGroup[]>(`http://localhost:8000/api/getall/bloodgroup/`);
  }

  getSearch(lid:number,bid:number):Observable<Result>{

    console.log(lid,bid);

  return this.http.get<Result>(`http://localhost:8000/api/get/location/bloodgroup/${lid}/${bid}/`);
  }


  bloodDonate(donordetails:DonorDetails):Observable<DonorDetails[]>
  {
    console.log(donordetails)
    return this.http.post<DonorDetails[]>(`http://localhost:8000/api/create/donordetails/`,donordetails)
  }

  getBloodBanks():Observable<BloodBank[]>
  {
    return this.http.get<BloodBank[]>(`http://localhost:8000/api/getall/bloodbank/`)
  }
  savePatientDetails(patient: PatientDetails):Observable<PatientDetails>
  {

     return this.http.post<PatientDetails>(`http://localhost:8000/api/create/patientdetails/`,patient);
  }

getAllUnits():Observable<TotalUnits[]>
{
  return this.http.get<TotalUnits[]>(`http://localhost:8000/api/get/totalunits/bloodgroup/`)
}

}


