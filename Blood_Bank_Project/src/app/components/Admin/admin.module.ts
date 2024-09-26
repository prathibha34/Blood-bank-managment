import { NgModule } from '@angular/core';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { AgGridModule } from 'ag-grid-angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiUrlService } from 'src/app/services/ApiUrls.service';
import { DataRepositoryService } from 'src/app/services/DataRepository.service';
import { FormsModule } from '@angular/forms';
import { DonorDetailsComponent } from './donor-details/donor-details.component';
import { BloodAvailabiltyComponent } from './blood-availabilty/blood-availabilty.component';
import { BankLocationComponent } from './bank-location/bank-location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BanksComponent } from './banks/banks.component';
import { AddDonorComponent } from './add-donor/add-donor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { RequestsComponent } from './requests/requests.component';

const routing = RouterModule.forChild([
  {
    path: 'main',
    component: AdminHomepageComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'blood/availability',component:BloodAvailabiltyComponent,canActivate: [AuthGuard]},
      {path: 'blood/location/:role',component:BankLocationComponent,canActivate: [AuthGuard]},
      {path: 'blood',component:BankLocationComponent,canActivate: [AuthGuard]},
      {path:'banks',component: BanksComponent,canActivate: [AuthGuard]},
      {path:'request',component: RequestsComponent,canActivate: [AuthGuard]},
      {path:'add/donor',component: AddDonorComponent,canActivate: [AuthGuard]},
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'donor', component: DonorDetailsComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'home' },
    ]
  },
  { path: '**', redirectTo: 'main' },
]);


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    routing,

    MatSidenavModule,
    MatSelectModule,

    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    NgxPaginationModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [AdminHomepageComponent,HomeComponent, DonorDetailsComponent, BloodAvailabiltyComponent, BankLocationComponent, BanksComponent, AddDonorComponent, RequestsComponent],
  providers: [ApiUrlService,DataRepositoryService,CookieService,DatePipe],
})
export class AdminModule {}
