import { Component, Inject, OnInit } from '@angular/core';
import { LabdipChartExceptionKeyinData } from 'src/app/model/labdip.chart.exception.keyin.data';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-labdip-chart-keyin-dialog',
  templateUrl: './labdip-chart-keyin-dialog.component.html',
  styleUrls: ['./labdip-chart-keyin-dialog.component.scss']
})
export class LabdipChartExceptionKeyinDialogComponent {

  constructor(public dialogRef: MatDialogRef<LabdipChartExceptionKeyinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LabdipChartExceptionKeyinData)  { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
