import { HttpClient } from '@angular/common/http';
import { UserDataService } from './../../../services/userdata.service';
import { HttpService } from './../../../utils/http.services';
import { ColDef } from './../../../../../node_modules/ag-grid-community/dist/lib/entities/colDef.d';
import { GridSizeChangedEvent, FirstDataRenderedEvent, GridReadyEvent } from './../../../../../node_modules/ag-grid-community/dist/lib/events.d';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GridApi } from 'ag-grid-community';
import { first } from 'rxjs';

export interface DeviceStatus {
  battery_status: number;
  created_time: number;
  devid: string;
  humidity: number;
  rawdata: string;
  temperature: number;
  updated_time: number;
  voltage: number;
}

@Component({
  selector: 'app-messagehistory',
  templateUrl: './messagehistory.component.html',
  styleUrls: ['./messagehistory.component.css']
})
export class MessagehistoryComponent implements OnInit {

  private gridApi!: GridApi;
  public selectedDeviceId:string = "";
  public paginationPageSize:number = 10;
  public columnDefs: ColDef[] = [
    { headerName: 'Device Id',field: 'devid', minWidth: 150, sortable: true },
    { headerName: 'Humidity',field: 'humidity', minWidth: 130 },
    { headerName: 'Temperature',field: 'temperature', minWidth: 130 },
    { headerName: 'Voltage',field: 'voltage', minWidth: 70, maxWidth: 90, sortable: true },
    { headerName: 'Battery',field: 'battery_status', minWidth: 120, sortable: true },
    { headerName: 'Last Updated Time',field: 'updated_time', minWidth: 80, sortable: true }
  ];
  public defaultColDef: ColDef = {
    resizable: true,
    cellRenderer: this.customCellRenderer,
  };
  public message_history_list: DeviceStatus[] = [];
  public devices_list_arr:string[] = [];
  public userObj:any;

  constructor(
    private httpService: HttpService,
    private _userDataService :UserDataService,
    private http: HttpClient
    ) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params: GridSizeChangedEvent) {
    // get the current grids width
    let gridWidth = document.getElementById('grid-wrapper')!.offsetWidth;
    // keep track of which columns to hide/show
    let columnsToShow = [];
    let columnsToHide = [];
    // iterate over all columns (visible or not) and work out
    // now many columns can fit (based on their minWidth)
    let totalColsWidth = 0;
    let allColumns = params.columnApi.getColumns();
    if (allColumns && allColumns.length > 0) {
      for (let i = 0; i < allColumns.length; i++) {
        let column = allColumns[i];
        totalColsWidth += column.getMinWidth() || 0;
        if (totalColsWidth > gridWidth) {
          columnsToHide.push(column.getColId());
        } else {
          columnsToShow.push(column.getColId());
        }
      }
    }
    // show/hide columns based on current grid width
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    // fill out any available space to ensure there are no gaps
    params.api.sizeColumnsToFit();
  }

  changeDevicesList(){
    this.selectedDeviceId = this.selectedDeviceId;
    this.getDeviceMsgHistory();
  }

  customCellRenderer(params:any) {

    let renderHtml = params.value;
    let col = params["colDef"]["field"];
    let data = (params.value != null) ? params.value : "-";

    if(col === "devid"){

      renderHtml = `<i class="fas fa-hdd text-muted"></i> ${data}`;

    }else if(col === "humidity"){

      renderHtml = `<i class="fas fa-tint text-muted"></i> ${data}`;

    }else if(col === "temperature"){

      renderHtml = `<i class="fas fa-thermometer-three-quarters text-muted"></i> ${data}`;

    }else if(col === "voltage"){

      renderHtml = `<i class="fas fa-bolt text-muted"></i> ${data}`;

    }else if(col === "updated_time"){

      renderHtml = data ? moment(data).format('MM/DD/YYYY, hh:mm:ss a') : "-";

    }else if(col === "battery_status"){

      let battery_status_obj:{[key: string]: string } = {
        "0": "Critical",
        "1": "Low",
        "2": "Normal",
        "3": "Good"
      }

      if(data != null){
        let val = battery_status_obj[data];
        renderHtml = `<img src="../../../../assets/images/battery/battery-${data}.png" style="height:20px;" /> ${val}`;
      }
    }

    return renderHtml;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    // this.getSingleDeviceHistory();
  }

  onFilterTextBoxChanged() {
    // this.getSingleDeviceHistory();
    this.gridApi.setQuickFilter(  //Client side data filtering
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onPagination(value: string) {

    this.paginationPageSize = parseInt(value);

    console.log("paginationPageSize-------");
    console.log(this.paginationPageSize);

    // this.getSingleDeviceHistory();
    // this.gridApi.setQuickFilter(
    //   (document.getElementById('filter-text-box') as HTMLInputElement).value
    // );
  }

  getAllDevices(): Promise<string> {

    return new Promise((resolve, reject) => {
      let slug = this.userObj["domainKey"].toLowerCase();
      let api = "LHT65/devices";
      let method = "post";
      let key = "";
      let token = this.userObj["token"];
    
      let obj = {
        authType: "TOKEN"
      };
    
      let data = {};

      this.httpService.microAPI(slug, api, method, data, key, token, obj).subscribe({
        next: (res) => {
          this.devices_list_arr = res["values"];
          this.selectedDeviceId = this.devices_list_arr[0];
          this.getDeviceMsgHistory();
          // resolve(res);
        },
        error: (err) => {
          // reject(err);
        },
        complete: () => {
          //console.log("Completed!!!");
        }
      });
    });
  }

   getDeviceMsgHistory(): Promise<string> {
    return new Promise((resolve, reject) => {
        let slug = this.userObj["domainKey"].toLowerCase();
        let api = "LHT65/between";
        let method = "post";
        let key = "";
        let token = this.userObj["token"];
      
        let obj = {
          authType: "TOKEN"
        };
      
        let data = {
          "devid": this.selectedDeviceId,
          "size": this.paginationPageSize,
          "sort": "desc",
          "tz":"+05:30",
          "fdate": "2023-01-02",
          "tdate": "2023-01-09"
        };

        this.httpService.microAPI(slug, api, method, data, key, token, obj).subscribe({
          next: (res) => {
            this.message_history_list = res["values"];
            // resolve(res);
          },
          error: (err) => {
            // reject(err);
          },
          complete: () => {
            //console.log("Completed!!!");
          }
        });
    });
  }

  // getInitialData() {
  //   this.getAllDevices().then(data => {
  //     let devid = "";
  //     if(data != null){
  //         devid = Object.values(data)[1][0];
  //         this.selectedDeviceId = devid;
  //     }
  //     return this.getDeviceMsgHistory(); // Return a new Promise
  //   })
  //   .then(() => console.log('Done!'))
  //   .catch(error => console.error(error));
  // }
  
  ngOnInit(): void {
    this._userDataService.userDataChange$.subscribe(value => {
      this.userObj = value;
      this.getAllDevices();
    });
  }
}
