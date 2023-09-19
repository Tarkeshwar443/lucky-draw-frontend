import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { MatDialog } from '@angular/material/dialog';
import { WinnerPopupComponent } from '../winner-popup/winner-popup.component';

@Component({
  selector: 'app-prize-dashboard',
  templateUrl: './prize-dashboard.component.html',
  styleUrls: ['./prize-dashboard.component.scss'],
})
export class PrizeDashboardComponent {
  winnerName: string = 'Tarkeshwar';
  winnerId: number = 123456789;
  counter: number = 5;
  interval: any;
  constructor(public comSvc: CommonService, public dialog: MatDialog) {}
  ngDoCheck() {
    if (this.counter == 0) {
      clearInterval(this.interval);
      this.counter = 5;
      const dialogRef = this.dialog.open(WinnerPopupComponent, {
        height: '400px',
        width: '400px',
        data: 'Congratulations',
      });
    }
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.counter) {
        this.counter--;
      }
    }, 1000);
  }
}
