import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import * as XLSX from "xlsx";
import { LabdipChartVM } from 'src/app/model/labdip.chart.vm';
import { BroadCastServiceService } from 'src/app/services/broad-cast-service.service';

@Component({
  selector: 'app-labdip-treadshade-result-child-table',
  templateUrl: './labdip-treadshade-result-child-table.component.html',
  styleUrls: ['./labdip-treadshade-result-child-table.component.scss']
})
export class LabdipTreadshadeResultChildTableComponent implements AfterViewInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  
  displayedColumns : string []=['index',
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


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort ; 
  
  constructor(private _liveAnnouncer: LiveAnnouncer,private _broadCast:BroadCastServiceService) {    
    this._broadCast.currentData.subscribe(data=>{
      this.dataSource.data = data.processResult;
    })
  }

  ngAfterViewInit() {      
   this.dataSource.paginator = this.paginator;
   this.eventsSubscription = this.events.subscribe(() => this.exportexcel('ThreadShade','ThredShadeResult'));
  }
  
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  exportexcel(tableId: string, name?: string)
  {
    /* pass here the table id */
    let element = document.getElementById("labdipChartThredShadeResultTable");
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    let timeSpan = new Date().toISOString();
    let prefix = name || "ExportResult";
    let fileName = `${prefix}-${timeSpan}`;
    XLSX.writeFile(wb,  `${fileName}.xlsx`); 
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
 
}
