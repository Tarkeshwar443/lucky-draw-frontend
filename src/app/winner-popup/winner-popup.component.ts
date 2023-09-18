import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-winner-popup',
  templateUrl: './winner-popup.component.html',
  styleUrls: ['./winner-popup.component.scss'],
})
export class WinnerPopupComponent {
  popMsg: string = '';
  constructor(
    public dialogRef: MatDialogRef<WinnerPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.popMsg = 'Congratulations!';
  }
}
