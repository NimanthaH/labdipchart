import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';
  

export class SnackBarPositionExample {
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    message: string = "";
    action : string = "";
  
    constructor(private _snackBar: MatSnackBar) {}
  
    openSnackBar() {
      this._snackBar.open(this.message,this.action , {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }