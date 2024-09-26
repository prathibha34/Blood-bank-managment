import { BloodGroup } from "./BloodGroup"


export class PatientDetails{


  patient_id?:number
  patient_name?:string
    blood_group?:BloodGroup
    patient_location?:Location
    units?:number
    hospital_name?:string
    contact_number?:number
    gender?:string
    age?:number
    status?:string
    units_required?:number
    created_at?:Date
}
