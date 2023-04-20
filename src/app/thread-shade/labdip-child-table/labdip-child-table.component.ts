import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LabdipChartVM } from 'src/app/model/labdip.chart.vm';
import { BroadCastServiceService } from 'src/app/services/broad-cast-service.service';

@Component({
  selector: 'app-labdip-child-table',
  templateUrl: './labdip-child-table.component.html',
  styleUrls: ['./labdip-child-table.component.scss']
})
export class LabdipChildTableComponent implements AfterViewInit {


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
      this.dataSource.data = data.labdipChartModels;
    })
   }

  ngAfterViewInit() {      
    this.dataSource.paginator = this.paginator;
    
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
}
