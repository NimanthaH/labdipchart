import { Component, Inject, OnInit } from '@angular/core';
import { LabdipChartKeyinData } from 'src/app/model/labdip.chart.keyin.data';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-labdip-chart-exception-dialog',
  templateUrl: './labdip-chart-exception-dialog.component.html',
  styleUrls: ['./labdip-chart-exception-dialog.component.scss']
})
export class LabdipChartExceptioninDialogComponent {

  constructor(public dialogRef: MatDialogRef<LabdipChartExceptioninDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LabdipChartKeyinData)  { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
