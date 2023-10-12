import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('video') myVideo!: ElementRef;
  winnerName: string = 'Tarkeshwar';
  winnerId: number = 123456789;
  counter: number = 7;
  prize_counter: number = 5;
  interval: any;
  prize_interval: any;
  prize_name: string = '';
  idx: number = 1;
  winnersList: winner[] = [];
  counterFlag: boolean = true;
  dialogRef: any;
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
    if (this.prize_counter == 0) {
      clearInterval(this.prize_interval);
      this.prize_counter = 5;
      this.dialogRef.close();
      this.startSpinCounter();
    }
    if (this.counter == 0) {
      clearInterval(this.interval);
      this.counterFlag = true;
      this.counter = 7;
      this.myVideo.nativeElement.pause();
      let data: any = '';
      this.comSvc.fetchRandomName().subscribe({
        next: (res: any) => {
          const winner: winner = {
            serial_number: this.idx,
            EmpID: res['employee_id'],
            EmpName: res['employee_name'],
            prize_name: this.prize_name,
          };
          this.winnersList.push(winner);
          this.comSvc.saveWinnerDetails(JSON.stringify(winner)).subscribe({
            next: (res: any) => {},
            error: (err: any) => {
              console.log('Error saving winner details');
            },
          });
          this.idx--;
          data = res;
          const dialogRef = this.dialog.open(WinnerPopupComponent, {
            height: '400px',
            width: '700px',
            data: { action: 'winner', res: data },
          });
        },
        error: (err: any) => {
          console.log('Error fetching employee name');
        },
      });
    }
  }
  startPrizeTimer() {
    this.comSvc.fetchPrizeName(this.idx).subscribe({
      next: (res: any) => {
        this.prize_name = res;
        this.dialogRef = this.dialog.open(WinnerPopupComponent, {
          height: '400px',
          width: '700px',
          disableClose: true,
          data: {
            action: 'prize',
            imageNo: this.idx,
            prize_name: this.prize_name,
          },
        });
      },
      error: (err: any) => {
        console.log('Error fetching prize name');
      },
    });
    this.prize_interval = setInterval(() => {
      this.prize_counter--;
    }, 1000);
  }
  startSpinCounter() {
    this.interval = setInterval(() => {
      if (this.counter) {
        this.counter--;
        this.counterFlag = false;
        this.myVideo.nativeElement.play();
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
