import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.scss'],
})
export class CreateEventsComponent {
  employeeListFileName: string = '';
  prizeListFileName: string = '';
  employeeList: any = '';
  prizeList: any = '';
  constructor(public comSvc: CommonService, public router: Router) {}
  ngOnInit() {}
  uploadFile(fileType: any, file: any) {
    const action: string = fileType;
    switch (fileType) {
      case 'employeeList':
        this.employeeList = file.target.files[0];
        this.employeeListFileName = file.target.files[0].name;
        break;
      case 'prizeList':
        this.prizeList = file.target.files[0];
        this.prizeListFileName = file.target.files[0].name;
        break;
    }
  }
  checkValidation() {
    if (
      this.comSvc.eventName.trim() != '' &&
      this.prizeListFileName &&
      this.employeeListFileName
    )
      return false;
    return true;
  }
  uploadFiles() {
    let excelObj = new FormData();
    excelObj.append('file', this.employeeList);
    this.comSvc.uploadEmployeeList(excelObj).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    excelObj.delete('file');
    excelObj.append('file', this.prizeList);
    this.comSvc.uploadPrizeList(excelObj).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['prizeDashboard']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
