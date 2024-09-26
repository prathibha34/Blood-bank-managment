import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login-component/login.component';
import { AuthGuard } from './components/shared/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { AdminHomepageComponent } from './components/Admin/admin-homepage/admin-homepage.component';
import { UserhomepageComponent } from './components/users/userhomepage/userhomepage.component';
import { PatientComponent } from './components/users/patient/patient.component';
import { ThanksComponent } from './components/users/thanks/thanks.component';


const routes: Routes = [
  { path: 'home', component: HomepageComponent,   },
  { path: 'login', component: LoginComponent },
  {path:'register',component:RegisterComponent},
  {path:'requestblood',component:UserhomepageComponent},
  {path:'patientdetails',component:PatientComponent,canActivate:[AuthGuard]},
  {path:'thanks/:patientObj',component:ThanksComponent,canActivate:[AuthGuard]},
  {
    path:"admin",
    loadChildren:()=> import('./components/Admin/admin.module').then(m=>m.AdminModule)
  },
  { path: '**', component: HomepageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
