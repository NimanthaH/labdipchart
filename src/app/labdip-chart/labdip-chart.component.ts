import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabdipChartVM } from '../model/labdip.chart.vm';
import { LabdipChartKeyinDialogComponent } from './labdip-chart-keyin-dialog/labdip-chart-keyin-dialog.component';
import { LabdipChartKeyinData } from '../model/labdip.chart.keyin.data';
import * as XLSX from "xlsx";
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { NotifierService } from '../services/notifier.service';
import { HttpServiceService } from '../services/http-service.service';
import { AutomationRequest } from '../model/automation.request';
import { LabdipChartRequest } from '../model/labdipchart.request';
import { EnvService } from '../services/env.service';
import { FormControl } from '@angular/forms';
import { Options } from '../model/options';
import { Customers } from '../model/customers';
import * as XLSXStyle from 'xlsx-style';


@Component({
  selector: 'app-labdip-chart',
  templateUrl: './labdip-chart.component.html',
  styleUrls: ['./labdip-chart.component.scss']
})
export class LabdipChartComponent implements AfterViewInit {

  displayedColumns: string[] = ['keyin', 'index',
    'division',
    'season',
    'category',
    'program',
    'styleNoIndividual',
    'gmtDescription',
    'gmtColor',
    'nrf',
    'colorCode',
    'packCombination',
    'palcementName',
    'bomSelection',
    'itemName',
    'supplierName',
    'rmColor',
    'colorDyeingTechnic',
    'rmColorRef',
    'garmentWay',
    'fbNumber',
    'materialType'];
  dataSource = new MatTableDataSource<LabdipChartVM>();
  pageSize: number = 5;
  selectedFileToProcess: File;
  selectedLineMatrixFileToProcess: File;
  selectedBOMFilesToProcess: FileList;
  recordCountZero: boolean = false;
  notNewFileSelect: boolean = true;
  selectedOption: string = "";
  selectedCustomer: number = 0;
  Options: Options[] = [];
  Customers: Customers[] = [];

  toppings = new FormControl();
  //formDataObject: FormData;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private http: HttpClient,
    private _notifierService: NotifierService,
    private _http: HttpServiceService,
    private _envService: EnvService) {
    //this.formDataObject = new FormData();
    this._http.getOptions().subscribe(result => {
      this.Options = <Options[]>result.data;
    })
    this._http.getCustomers().subscribe(result => {
      this.Customers = <Customers[]>result.data;
    })
    this.clearData();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clearData() {
    this.toppings.setValue(0);
    this.selectedOption = "";
  }

  onOptionChange(event: any) {
    this.selectedOption = event.value;
    var optiontype = <Options[]>this.Options.filter(c => c.optionId == event.value);
    if (optiontype != null && optiontype.length > 0 && optiontype[0].type == "BOM") {

    } else if (optiontype == null && optiontype.length == 0) {

    }
  }

  onCustomerChange(event: any) {
    console.log('event: ', event);
    this.selectedCustomer = event.value;
  }

  processLabdipFile() {
    //console.log("click process event");
    this.uploadFile(this.selectedBOMFilesToProcess, this.selectedLineMatrixFileToProcess);
  }

  onBOMFilesSelected(event: any) {
    this.selectedBOMFilesToProcess = event.target.files;
    if (this.selectedBOMFilesToProcess) {
      this.notNewFileSelect = false;
      this.recordCountZero = false;
      this.dataSource = new MatTableDataSource<LabdipChartVM>();
      this.ngAfterViewInit();
    } else {
      this._notifierService.showNotification('No file chosen', 'OK');
    }
  }

  onLineMatrixFileSelected(event: any) {
    this.selectedLineMatrixFileToProcess = event.target.files[0];
    if (this.selectedLineMatrixFileToProcess) {
      this.notNewFileSelect = false;
      this.recordCountZero = false;
      this.dataSource = new MatTableDataSource<LabdipChartVM>();
      this.ngAfterViewInit();
    } else {
      this._notifierService.showNotification('No file chosen', 'OK');
    }
  }

  async uploadFile(techPackFiles: FileList, lineMtarixFile: File) {
    if (techPackFiles != null && techPackFiles.length > 0) {
      let output = [];

      const formData: FormData = new FormData();

      if (this.selectedOption == null && this.selectedOption == "") {
        this.notNewFileSelect = false;
        this.recordCountZero = false;
        this._notifierService.showNotification('select an option before proceed', 'OK');
        return;
      } else {
        formData.append(this.selectedOption, "option");
      }

      if (techPackFiles != null && techPackFiles.length > 0) {
        for (let i = 0; i < techPackFiles.length; i++) {
          formData.append('techpackfile', techPackFiles[i], techPackFiles[i].name);
        }
      } else {
        this.notNewFileSelect = false;
        this.recordCountZero = false;
        this._notifierService.showNotification('no tech pack files selected', 'OK');
        return;
      }

      var optiontype = <Options[]>this.Options.filter(c => c.optionId == this.selectedOption);
      if (optiontype != null && optiontype.length > 0 && optiontype[0].type == "BOM") {
        if (lineMtarixFile != null) {
          formData.append('linematrixfile', lineMtarixFile, lineMtarixFile.name);
        } else {
          this.notNewFileSelect = false;
          this.recordCountZero = false;
          this._notifierService.showNotification('line matrix cant be empty', 'OK');
          return;
        }
      } else if (optiontype == null && optiontype.length == 0) {
        this.notNewFileSelect = false;
        this.recordCountZero = false;
        this._notifierService.showNotification('before procced please select an valid option', 'OK');
        return;
      }

      if (this.selectedCustomer != null && this.selectedCustomer == 0) {
        this.notNewFileSelect = false;
        this.recordCountZero = false;
        this._notifierService.showNotification('before procced please select an valid customer', 'OK');
        return;
      } else {
        console.log('selectedCustomer: ', this.selectedCustomer);
        formData.append(this.selectedCustomer.toString(), "customer");
      }

      //console.log('formdata:', formData.getAll('techpackfile'));

      if (true) {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic'
        });
        let head = { headers: headers };

        await this.http.post(`${this._envService.apiUrl}labdip/labdipChart`, formData).subscribe(result => {
          if (result) {
            output.push(result);
            //console.log('result:', result);
            this.notNewFileSelect = false;
            this.recordCountZero = false;
            this._notifierService.showNotification('processing completed', 'OK');
          } else {
            this.notNewFileSelect = false;
            this.recordCountZero = false;
            this._notifierService.showNotification('result fletch failed', 'OK');
          }

          if (output && output != null && output.length > 0) {
            let index = 1;
            output[0]?.forEach((c: { index: number; }) => {
              c.index = index++;
            });
            this.dataSource.paginator = null; // Disable pagination
            this.dataSource.data = <LabdipChartVM[]>output[0];
            this.notNewFileSelect = true;
            this.recordCountZero = true;
            this._notifierService.showNotification("success", 'OK');

            this.dataSource.sort = this.sort;
            //this.dataSource.paginator = this.paginator; // Remove this line
            this.pageSize = this.dataSource.data.length; // Remove this line
          } else {
            this.notNewFileSelect = false;
            this.recordCountZero = false;
            this._notifierService.showNotification("output is empty", 'OK');
          }

        });
      }
    } else {
      this.notNewFileSelect = false;
      this.recordCountZero = false;
      this._notifierService.showNotification("no tech packs found to proccess", 'OK');
    }
  }

  // editContact(element)
  editContact(row: any) {
    //console.log(row);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(LabdipChartKeyinDialogComponent, {
      width: '600px',
      data: this.prepareKeyInData(element),
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.applyToAll) {
          this.dataSource.data.forEach(ele => {
            ele.program = result.program;
            ele.packCombination = result.packCombination;
            ele.rmColorRef = result.rmColorRef;
          });
        }
        else {
          this.dataSource.data.filter(p => p.index == result.index).forEach(ele => {
            ele.program = result.program;
            ele.packCombination = result.packCombination;
            ele.rmColorRef = result.rmColorRef;
          });
        }
      }
    });
  }

  prepareKeyInData(element: any): LabdipChartKeyinData {
    let labdipChartKeyData: LabdipChartKeyinData = {
      index: element.index,
      division: element.division,
      season: element.season,
      category: element.category,
      program: element.program,
      packCombination: element.packCombination,
      rmColorRef: element.rmColorRef,
      applyToAll: true
    }
    return labdipChartKeyData
  }

  exportexcel(tableId: string, name?: string) {
    /* Pass the table ID */
    let element = document.getElementById(tableId) as HTMLTableElement;
    console.log('element: ', element);
    let rows = element.rows;
  
    for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].cells;
      cells[0].remove();
    }
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    console.log('ws: ', ws);
  
    /* Find the range of the data */
    const range: XLSX.Range = XLSX.utils.decode_range(ws['!ref'] || '');
  
    /* Set the autofilter range to include all columns based on the header row */
    const headerRow = range.s.r; // Get the row index of the header row
    const filterRange = { s: { r: headerRow, c: range.s.c }, e: { r: range.e.r, c: range.e.c } };
    ws['!autofilter'] = { ref: XLSX.utils.encode_range(filterRange) };
  
    console.log();
  
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        var cell = ws[XLSX.utils.encode_cell({ r: row, c: col })];
        cell.t = 's';
  
        // Check if the cell value starts with a leading zero
        const cellValue = cell.v.toString();
        if (cellValue.startsWith('0')) {
          // Prepend a single quote to the value to force Excel to treat it as text
          cell.v = "'" + cellValue;
        }
      }
    }
  
    /* Generate a workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    /* Save to a file */
    let timeSpan = new Date().toISOString();
    let prefix = name || "ExportResult";
    let fileName = `${prefix}-${timeSpan}`;
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}





