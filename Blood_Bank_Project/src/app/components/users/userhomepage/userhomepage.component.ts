import { ApiUrlService } from 'src/app/services/ApiUrls.service';

import { Component, OnInit } from '@angular/core';


import { NgForm } from '@angular/forms';


import { MapType } from '@angular/compiler';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataRepositoryService } from 'src/app/services/DataRepository.service';
import { Result } from 'src/app/models/Results';
import { Location } from 'src/app/models/Locations';
@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrls: ['./userhomepage.component.css']
})
export class UserhomepageComponent implements OnInit {


  constructor(private dataRepository: DataRepositoryService, private api:ApiUrlService,private route:Router) {
    //this.api.getSearch(this.lid!,this.bid!).subscribe(data=>this.result=data);
  }

  ngOnInit(): void {


  }
  city?:String=""
  areas?:String=""
  type?:String=""
  result?:Result
  bid:number|undefined
  lid:number|undefined
  get blood(){
    console.log(this.type+"type")
    return this.dataRepository.getBloodGroupType().map(e=>e.blood_group_type)
  }
  get cities()
  {
    console.log(this.area);
    return this.locations.map(e=>e.city?.toLocaleUpperCase()).filter((value,index,self)=>self.indexOf(value)===index)
  }

  search(form:NgForm)
{
 // console.warn(form.value)
  if(this.city!="" && this.areas!=""&& this.type!="")
  {


 this.lid =this.locations.filter(e=>e.area?.toLocaleLowerCase()==this.areas?.toLocaleLowerCase()).map(e=>e.location_id)[0]
   this.bid=this.dataRepository.getBloodGroupType().filter(e=>e.blood_group_type?.toLocaleLowerCase()==this.type?.toLocaleLowerCase()).map(e=>e.blood_group_id)[0]
   console.log(this.lid,this.bid);
   this.api.getSearch(this.lid!, this.bid!).subscribe((data: any) => {
    this.result = data;
    this.swal();
  });
  }

}


swal() {
  //if (this.result!.total_units!== 0 )
  console.log(this.result?.blood_group_type);
  console.log(typeof(this.result?.total_units));

  if ( this.result!.total_units === 0 ||this.result!.total_units === undefined  ) {

    Swal.fire({
      title: 'Unavailable Blood',
      text: 'The desired blood group is currently unavailable',
      icon: 'error',
      iconHtml: '<i class="fas fa-sad-tear"></i>',
      confirmButtonText: 'Close',
      confirmButtonColor: '#3085d6',
    });
  }
 else if(this.result!.total_units   !== 0 ||  this.result!.total_units !== undefined)
 {
  Swal.fire({
    title: 'Desired Blood Group Available',
    text: 'Please register or login to get the blood',
    icon: 'success',
    iconHtml: '<i class="fas fa-smile-beam"></i>',
    showCancelButton: true,
    cancelButtonText: 'Login',
    confirmButtonText: 'Register',
    backdrop: 'static',
    allowOutsideClick: false,
    confirmButtonColor: '#ffc107',
    cancelButtonColor: '#007bff',
    closeButtonHtml: '<i class="fas fa-times"></i>',
    showCloseButton: true,
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn btn-warning me-2',
      cancelButton: 'btn btn-primary',
      closeButton: 'btn btn-close', // Add a custom class for the close button
    },
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('Navigating to registration');
      this.route.navigateByUrl('/register');
    } else if (result.dismiss === Swal.DismissReason.close) {
      console.log('Close button clicked');
    } else {
      console.log('Navigating to user login');
      this.route.navigateByUrl('/login');
    }
    Swal.close();
    return this.result;
  });

}

 }

get area(){
console.log(this.city);

 return this.locations.filter(e=>e.city!.toLocaleLowerCase()==this.city?.toLocaleLowerCase()).map(e=>e.area)
}

  get locations():Location[]
  {

    return this.dataRepository.getLocations()
  }


}
