import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ThreadTypeDialogVM } from 'src/app/model/thread.type.dialog.vm';
import { ThreadType } from 'src/app/model/thread.type.vm';
import { CrudAction } from 'src/app/model/crud.action.enum';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { AutomationRequest } from 'src/app/model/automation.request';
import { HeaderMaster } from 'src/app/model/header.master';

@Component({
  selector: 'app-configure-columns',
  templateUrl: './configure-columns.component.html',
  styleUrls: ['./configure-columns.component.scss']
})

export class ConfigureColumnsComponent implements AfterViewInit {

  
  displayedColumns : string []=['action','id','headerType','variation','fileName','headerAttribute','subHeaderAttribute','setSameHeaderasValue','subValueAttribute','lowerBoundHedaerName','upperBoundHeaderName','hedaerName','rowSpan','columnSpan','subId','updateforAll','filterData','skipBlanks','repeatData','split','replace','extract','transformData','saveTransformVariation'];
  dataSource = new MatTableDataSource<HeaderMaster>();
  crudAction : CrudAction = CrudAction.AddNew;

  sampleData : HeaderMaster[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator 
  @ViewChild(MatSort) sort: MatSort ; 

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private _httpService : HttpServiceService,
              public dialog: MatDialog){   
     this._httpService.getHeaderMasterDetails().subscribe(result=>{ 
       this.dataSource.data = <HeaderMaster[]>result.data;       
     })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;   
  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(element:any, action: number):void {
    // const dialogRef = this.dialog.open(AddnewUpdateDialogComponent,{
    //   width: '600px',
    //   data:this.prepareDialogData(element,action),
    //   height:'auto',
    // });

    console.log(this.prepareDialogData(element,action))

    // dialogRef.afterClosed().subscribe(result =>{      
    //   let theadType : ThreadType = {
    //     id : result.id,
    //     threadType : result.threadType,
    //     supplier : result.supplier,
    //     ticketNo: result.ticketNo
    //   }
    //   let responseStatus : Boolean = true;
    //   switch(result.actionType) {       
    //     case 1 : {
    //       console.log(this.prepareThreadType(theadType));
    //       this._httpService.insertThreaType(this.prepareThreadType(theadType)).subscribe(response=>{           
    //         response.isSuccess ?
    //           this.dataSource.data = <ThreadType[]>response.data : responseStatus = response.isSuccess;
    //       });
    //       break;
    //     }
    //     case 2 : {
    //       this._httpService.updateThreadType(this.prepareThreadType(theadType)).subscribe(response=>{
    //         response.isSuccess ?
    //           this.dataSource.data = <ThreadType[]>response.data : responseStatus = response.isSuccess;
    //       });
    //       break;
    //     }
    //     case 3 : {
    //       this._httpService.deleteThreadType(this.prepareThreadType(theadType)).subscribe(response=>{
    //         response.isSuccess ?
    //           this.dataSource.data = <ThreadType[]>response.data : responseStatus = response.isSuccess;
    //       });
    //       break;
    //     }
    //   }
    //   //if isSuccess then msg prompt
    //   console.log(responseStatus);

    // });
  }

  prepareDialogData(element:any,action: number):ThreadTypeDialogVM{
    let thredTypeDialogVM : ThreadTypeDialogVM = {
      actionType : action,
      id : element.id,
      threadType : element.threadType,
      supplier : element.supplier,
      ticketNo : element.ticketNo
      
    }
    return thredTypeDialogVM;
  } 

  addNewRecord(){
    let ThreadType : ThreadType = {
      id : 0,
      threadType : "",
      supplier : "",
      ticketNo : ""

    }
    this.openDialog(ThreadType,1); 
  }

  prepareThreadType(thread:ThreadType): AutomationRequest<ThreadType> {    
    let request : AutomationRequest<ThreadType> = new AutomationRequest<ThreadType>(thread);
    return  request;
  }
}
