import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThreadTypeDialogVM } from 'src/app/model/thread.type.dialog.vm';

@Component({
  selector: 'app-addnew-update-dialog',
  templateUrl: './addnew-update-dialog.component.html',
  styleUrls: ['./addnew-update-dialog.component.scss']
})
export class AddnewUpdateDialogComponent  {

  action : string = ""; 
  lockStatus : boolean = true;

  constructor(public dialogRef: MatDialogRef<AddnewUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ThreadTypeDialogVM) { 

      this.setActionType(this.data);
    }

  setActionType(data:any){
    switch(data.actionType){
      case 1 : {
        this.action = "Add New";
        break;
      }
      case 2 : {
        this.action = "Update";
        break;
      }
      case 3 : {
        this.action = "Delete";
        break;
      }
    }
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
