import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { MatDialog } from '@angular/material/dialog';
import { WinnerPopupComponent } from '../winner-popup/winner-popup.component';
export interface winner {
  serial_number: number;
  EmpName: string;
  EmpID: number;
  prize_name: string;
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
  idx: number = 0;
  winnersList: winner[] = [];
  counter_flag: boolean = true;
  constructor(public comSvc: CommonService, public dialog: MatDialog) {}
  ngOnInit() {
    this.comSvc.fetchTotalPrizes().subscribe({
      next: (res: any) => {
        this.idx = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.winnersList = [];
    this.comSvc.getWinnerDetails().subscribe({
      next: (res: any) => {
        this.winnersList = [...res];
        this.idx =
          this.winnersList.length < this.idx
            ? this.idx - this.winnersList.length
            : 0;
      },
      error: (err: any) => {
        console.log('Error fetching winner details');
      },
    });
  }
  ngDoCheck() {
    if (this.counter == 0) {
      clearInterval(this.interval);
      this.counter_flag = true;
      this.counter = 5;
      let data: any = '';
      this.comSvc.updateDBSpin().subscribe({
        next: (res: any) => {
          this.comSvc.fetchRandomName().subscribe({
            next: (res: any) => {
              this.comSvc.fetchPrizeName(this.idx).subscribe({
                next: (prize: any) => {
                  const winner: winner = {
                    serial_number: this.idx,
                    EmpID: res['employee_id'],
                    EmpName: res['employee_name'],
                    prize_name: prize,
                  };
                  this.winnersList.push(winner);
                  this.comSvc
                    .saveWinnerDetails(JSON.stringify(winner))
                    .subscribe({
                      next: (res: any) => {},
                      error: (err: any) => {
                        console.log('Error saving winnder details');
                      },
                    });
                  this.idx--;
                  data = res;
                  const dialogRef = this.dialog.open(WinnerPopupComponent, {
                    height: '400px',
                    width: '700px',
                    data: data,
                  });
                },
                error: (err: any) => {
                  console.log('Error fetching prize name');
                },
              });
            },
            error: (err: any) => {
              console.log('Error fetching employee name');
            },
          });
        },
        error: (err: any) => {
          console.log('Error updating DB on spin');
        },
      });
    }
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.counter) {
        this.counter--;
        this.counter_flag = false;
      }
    }, 1000);
  }
  winnerDetails() {
    this.comSvc.fetchRandomName().subscribe({
      next: (res: any) => {
        const winner: winner = {
          serial_number: this.idx,
          EmpID: res['employee_id'],
          EmpName: res['employee_name'],
          prize_name: 'TV',
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
