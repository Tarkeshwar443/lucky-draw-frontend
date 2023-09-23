import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { MatDialog } from '@angular/material/dialog';
import { WinnerPopupComponent } from '../winner-popup/winner-popup.component';
export interface winner {
  sno: number;
  employeeName: string;
  employeeId: number;
  prize: string;
}
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
  idx: number = 10;
  winnersList: winner[] = [];
  constructor(public comSvc: CommonService, public dialog: MatDialog) {}
  ngOnInit() {}
  ngDoCheck() {
    if (this.counter == 0) {
      clearInterval(this.interval);
      this.counter = 5;
      const data = this.comSvc.fetchRandomName().subscribe({
        next: (res: any) => {
          const winner: winner = {
            sno: this.idx,
            employeeId: res['employee_id'],
            employeeName: res['employee_name'],
            prize: 'TV',
          };
          this.winnersList.push(winner);
          this.idx--;
          return res;
        },
        error: (err: any) => {
          return err;
        },
      });
      const dialogRef = this.dialog.open(WinnerPopupComponent, {
        height: '400px',
        width: '700px',
        data: data,
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
  winnerDetails() {
    this.comSvc.fetchRandomName().subscribe({
      next: (res: any) => {
        const winner: winner = {
          sno: this.idx,
          employeeId: res['employee_id'],
          employeeName: res['employee_name'],
          prize: 'TV',
        };
        this.winnersList.push(winner);
        this.idx--;
        return res;
      },
      error: (err: any) => {
        return err;
      },
    });
  }
}
