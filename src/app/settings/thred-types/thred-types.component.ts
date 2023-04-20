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
import { AddnewUpdateDialogComponent } from './addnew-update-dialog/addnew-update-dialog.component';
import { AutomationRequest } from 'src/app/model/automation.request';

@Component({
  selector: 'app-thred-types',
  templateUrl: './thred-types.component.html',
  styleUrls: ['./thred-types.component.scss']
})
export class ThredTypesComponent implements AfterViewInit {

  
  displayedColumns : string []=['action','id','threadType','supplier','ticketNo'];
  dataSource = new MatTableDataSource<ThreadType>();
  crudAction : CrudAction = CrudAction.AddNew;

  sampleData : ThreadType[] = [
    {
      "id":1,
      "threadType":"Red",
      "supplier" : "",
      "ticketNo" : ""
    },
    {
      "id":2,
      "threadType":"Black",
      "supplier" : "",
      "ticketNo" : ""
    },
    {
      "id":3,
      "threadType":"Blue",
      "supplier" : "",
      "ticketNo" : ""
    },
    {
      "id":4,
      "threadType":"Yello",
      "supplier" : "",
      "ticketNo" : ""
    },
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator 
  @ViewChild(MatSort) sort: MatSort ; 

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private _httpService : HttpServiceService,
              public dialog: MatDialog){   
     this._httpService.getThredTypes().subscribe(result=>{ 
       console.log(result.data);
       this.dataSource.data = <ThreadType[]>result.data;       
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

  openDialog(element:any, action: number):void {
    const dialogRef = this.dialog.open(AddnewUpdateDialogComponent,{
      width: '600px',
      data:this.prepareDialogData(element,action),
      height:'auto',
    });

    console.log(this.prepareDialogData(element,action))

    dialogRef.afterClosed().subscribe(result =>{      
      let theadType : ThreadType = {
        id : result.id,
        threadType : result.threadType,
        supplier : result.supplier,
        ticketNo: result.ticketNo
      }
      let responseStatus : Boolean = true;
      switch(result.actionType) {       
        case 1 : {
          console.log(this.prepareThreadType(theadType));
          this._httpService.insertThreaType(this.prepareThreadType(theadType)).subscribe(response=>{           
            response.isSuccess ?
              this.dataSource.data = <ThreadType[]>response.data : responseStatus = response.isSuccess;
          });
          break;
        }
        case 2 : {
          this._httpService.updateThreadType(this.prepareThreadType(theadType)).subscribe(response=>{
            response.isSuccess ?
              this.dataSource.data = <ThreadType[]>response.data : responseStatus = response.isSuccess;
          });
          break;
        }
        case 3 : {
          this._httpService.deleteThreadType(this.prepareThreadType(theadType)).subscribe(response=>{
            response.isSuccess ?
              this.dataSource.data = <ThreadType[]>response.data : responseStatus = response.isSuccess;
          });
          break;
        }
      }
      //if isSuccess then msg prompt
      console.log(responseStatus);

    });
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
