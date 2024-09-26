import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community'; // Import the ColDef type from ag-grid-community

@Component({
  selector: 'app-root',
  template:'<router-outlet></router-outlet>' ,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


}
