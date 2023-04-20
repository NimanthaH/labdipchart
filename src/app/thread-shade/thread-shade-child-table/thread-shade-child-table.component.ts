import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ThreadShadeChartVM } from 'src/app/model/thread.shade.chart.vm';
import { BroadCastServiceService } from 'src/app/services/broad-cast-service.service';

@Component({
  selector: 'app-thread-shade-child-table',
  templateUrl: './thread-shade-child-table.component.html',
  styleUrls: ['./thread-shade-child-table.component.scss']
})
export class ThreadShadeChildTableComponent implements AfterViewInit {

  
  displayedColumns : string []=['index','season','fs','washOrNonWash','fabricReference','rmBaseColorNameAndCode','washTechAndColor','requestedThread','threadSahde','repairThreadShade','comment'];
  dataSource = new MatTableDataSource<ThreadShadeChartVM>();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort ; 
  
  constructor(private _liveAnnouncer: LiveAnnouncer,private _broadCast:BroadCastServiceService) { 
    this._broadCast.currentData.subscribe(data=>{
      this.dataSource.data = data.threadShadeModels;
    })
  }

  ngAfterViewInit(): void {
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
