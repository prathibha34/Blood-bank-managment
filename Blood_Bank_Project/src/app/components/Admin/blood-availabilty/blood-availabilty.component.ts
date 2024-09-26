import { Component, OnInit } from '@angular/core';
import { TotalUnits } from 'src/app/models/TotalUnits';
import { User } from 'src/app/models/user.component';
import { ApiUrlService } from 'src/app/services/ApiUrls.service';
import { DataRepositoryService } from 'src/app/services/DataRepository.service';

@Component({
  selector: 'app-blood-availabilty',
  templateUrl: './blood-availabilty.component.html',
  styleUrls: ['./blood-availabilty.component.css']
})
export class BloodAvailabiltyComponent implements OnInit {

  isdefault: string = 'Select Blood Bank Location';
  totalunits: TotalUnits[] = [];
  locationid: number = 0;
  details: User[] = [];
  allbloodUnits: any = null;

  constructor(private api: ApiUrlService, private dataRepo: DataRepositoryService) {}

  ngOnInit(): void {
    this.getDetails({ target: { value: this.isdefault } });
  }

  get location() {
    return this.dataRepo.getLocations();
  }

  getDetails(location: any) {
    console.warn('Location ID:', location.target.value);

    // Check if the selected value is the default option
    if (location.target.value === 'Select Blood Bank Location') {
      console.warn('Default option selected');
      this.totalunits = []; // Reset the totalunits array
    } else {
      this.locationid = location.target.value;
      this.api.getBloodType(this.locationid).subscribe(data => {
        this.totalunits = data; // Assign the retrieved data to totalunits
        console.warn(this.totalunits); // Print the retrieved data
      });
    }
  }

  get currentDayDonors() {
    return this.dataRepo.getCurrentDayDonors().length;
  }

  get Pendingpatients() {
    return this.dataRepo.pendingPatientsRequest().length;
  }

  get acceptedPatients() {
    return this.dataRepo.acceptedPatientsRequest().length;
  }

  get donardetails() {
    console.warn(this.dataRepo.getDonardetails());
    return this.dataRepo.getDonardetails().length;
  }

  get allUnits() {
    if (!this.allbloodUnits) {
      this.api.getAllUnits().subscribe(e => (this.allbloodUnits = e));
    }
    return this.allbloodUnits;
  }
}
