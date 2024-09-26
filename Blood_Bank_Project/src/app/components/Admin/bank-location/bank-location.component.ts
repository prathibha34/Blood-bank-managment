import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataRepositoryService } from 'src/app/services/DataRepository.service';
import { Location } from 'src/app/models/Locations';
import { ApiUrlService } from 'src/app/services/ApiUrls.service';
import { TotalUnits } from 'src/app/models/TotalUnits';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bank-location',
  templateUrl: './bank-location.component.html',
  styleUrls: ['./bank-location.component.css']
})
export class BankLocationComponent implements OnInit, AfterViewInit {
  location: Location[] = [];
  filteredLocationIds: number[] = [];
  total: TotalUnits[] = [];

  role: string | null = '';

  constructor(private activeRoute: ActivatedRoute, private dataRepo: DataRepositoryService, private api: ApiUrlService) {
    this.role = this.activeRoute.snapshot.paramMap.get('role');


  }

  ngOnInit(): void {

    this.api.getLocations().subscribe(e=>{
      console.warn(e)
      this.location=e

      this.getFilteredLocationIds();

    })

  }

  ngAfterViewInit(): void {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['filteredLocationIds'] && !changes['filteredLocationIds'].firstChange) {
  //     this.getblood();
  //   }
  // }

  getFilteredLocationIds(): void {
console.log(this.role)
    const filteredIds = this.location
      .filter((e) => e.area?.toUpperCase() === this.role?.toUpperCase())
      .map((e) => e.location_id);
      console.warn(this.location)
    console.warn(filteredIds)
    if (filteredIds.length === 0) {
      console.log('No matching locations found');
    } else {
      this.filteredLocationIds = filteredIds as number[];
      console.log('Filtered Location IDs (assigned):', this.filteredLocationIds);

      setTimeout(() => {
        this.getblood();
      }, 0);
    }
  }

  getblood(): Subscription | undefined {
    if (this.filteredLocationIds.length > 0) {
      return this.api.getBloodType(this.filteredLocationIds[0]).subscribe(e => {
        this.total = e;
        console.log('Total:', e);
      });
    } else {
      console.log('No filtered location IDs found');
      return undefined;
    }
  }
}
