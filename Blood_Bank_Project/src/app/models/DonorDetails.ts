import { BloodGroup } from "./BloodGroup"
import { BloodBank } from "./BloodBank"


export class DonorDetails{

  donar_id?:number
  donar_name?:String
     blood_type?:BloodGroup
     age?:number
     gender?:String
     aadhar_number?:number
     transfusion_date?:Date
     bloodBank?:BloodBank
     units?:number
     contact_number?:number
     eligibility?:string
     location?:Location
      bank?:BloodBank

}
