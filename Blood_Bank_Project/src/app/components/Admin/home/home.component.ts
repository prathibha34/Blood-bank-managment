
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.component';
import { ApiUrlService } from 'src/app/services/ApiUrls.service';
import { MatSelectModule } from '@angular/material/select';
import { DataRepositoryService } from 'src/app/services/DataRepository.service';
import { TotalUnits } from 'src/app/models/TotalUnits';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  isdefault:string='Select Blood Bank Location'
  totalunits:TotalUnits[]=[]
  locationid:number=0
details:User[]=[]
allPatientsDetails:any
  constructor(private api:ApiUrlService,private dataRepo:DataRepositoryService) {

   }

  ngOnInit(): void {

  }

get location()
{
   return this.dataRepo.getLocations()
}


get currentDayDonors()
{
  return this.dataRepo.getCurrentDayDonors().length
}
// get Banks()
// {
//   console.warn(this.bank)
//   return this.bank
// }
// patient details for current date

get Pendingpatients()
{
  return this.dataRepo.pendingPatientsRequest().length
}

get acceptedPatients()
{
  return this.dataRepo.acceptedPatientsRequest().length
}
get donardetails()
{
  console.warn(this.dataRepo.getDonardetails())
  return this.dataRepo.getDonardetails().length
}
get allrequests()
{
  this.allPatientsDetails=this.dataRepo.getAllpatinetRequests()
  return this.dataRepo.getAllpatinetRequests().length
}
get rejected() {
  return this.allPatientsDetails.filter((e: any) => e.status.toUpperCase() === "REJECTED").length;
}
}
