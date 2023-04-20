import { Component, Inject, OnInit } from '@angular/core';
import { LabdipChartKeyinData } from 'src/app/model/labdip.chart.keyin.data';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-labdip-chart-keyin-dialog',
  templateUrl: './labdip-chart-keyin-dialog.component.html',
  styleUrls: ['./labdip-chart-keyin-dialog.component.scss']
})
export class LabdipChartKeyinDialogComponent {

  constructor(public dialogRef: MatDialogRef<LabdipChartKeyinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LabdipChartKeyinData)  { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
