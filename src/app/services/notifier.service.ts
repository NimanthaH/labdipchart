import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snakBar: MatSnackBar) { }

  showNotification(displayMessage:string,buttonText:string){
    this.snakBar.open(displayMessage,buttonText,{
      duration:5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
