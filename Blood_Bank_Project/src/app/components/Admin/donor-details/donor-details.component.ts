import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css']
})
export class DonorDetailsComponent {
  @ViewChild('agGrid') agGrid: any;

  private apiUrl = 'http://localhost:8000/api/getall/donordetails/'; // Replace with your API URL
  gridOptions: GridOptions;
  rowData: any[] = [];
  searchValue: string = '';

  constructor(private http: HttpClient) {
    this.gridOptions = {
      columnDefs: [
        { headerName: 'Name', field: 'donar_name', editable: true, sortable: true, filter: true,width: 122 },
        { headerName: 'Age', field: 'age', editable: true, sortable: true, filter: true, width: 122 },
        { headerName: 'Blood Type', field: 'blood_type.blood_group_type', editable: true, sortable: true, filter: true, width: 140 },
        { headerName: 'Gender', field: 'gender', editable: true, sortable: true, filter: true, width: 122 },
        { headerName: 'Aadhar', field: 'aadhar_number', editable: true, sortable: true, filter: true, width: 122  },
        { headerName: 'Transfusion Date', field: 'transfusion_date', editable: true, sortable: true, filter: true ,width: 160},
        { headerName: 'Donated Units', field: 'units', editable: true, sortable: true, filter: true, width: 122 },
        { headerName: 'Contact', field: 'contact_number', editable: true, sortable: true, filter: true, width: 122 },
        { headerName: 'Location', field: 'location.city', editable: true, sortable: true, filter: true, width: 122 },
        { headerName: 'Area', field: 'location.area', editable: true, sortable: true, filter: true, width: 122 },

        // Add more column definitions as needed
      ],
      pagination: true,
      paginationPageSize: 8,
      onGridReady: () => this.loadData(),
      onColumnResized: (event) => this.onColumnResized(event),
    };

    this.rowData = []; // Assign an empty array to rowData
  }

  loadData() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => {
        this.rowData = data;
      });
  }

  onSearch() {
    this.agGrid.api.setQuickFilter(this.searchValue);
  }

  onColumnResized(event: any) {
    const column = event.column;
    const newWidth = column.getActualWidth();

    // Handle the column resize event
    console.log(`Column "${column.getColDef().headerName}" resized to width: ${newWidth}`);
  }
}
