import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {
patient:any
  constructor(private activeRoute: ActivatedRoute) {
    this.patient=this.activeRoute.snapshot.paramMap.get('patientObj')
   }

  ngOnInit(): void {
  }

}
