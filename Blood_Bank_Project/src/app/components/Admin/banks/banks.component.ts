import { Component, OnInit } from '@angular/core';
import { DataRepositoryService } from 'src/app/services/DataRepository.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {

  constructor(private dataRepo:DataRepositoryService) { }

  ngOnInit(): void {
  }


  get locations()
  {
    return this.dataRepo.getLocations()
  }
}
