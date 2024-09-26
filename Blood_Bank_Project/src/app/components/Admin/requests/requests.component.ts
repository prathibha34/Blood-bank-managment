import { Component, OnInit } from '@angular/core';
import { DataRepositoryService } from 'src/app/services/DataRepository.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private dataRepo:DataRepositoryService) { }

  ngOnInit(): void {
  }

get requests()
{
 return this.dataRepo.pendingPatientsRequest()
}

}
