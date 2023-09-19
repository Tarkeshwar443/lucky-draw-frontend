import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.scss'],
})
export class CreateEventsComponent {
  employeeList: File | undefined;
  prizeList: File | undefined;
  constructor(public comSvc: CommonService) {}
  ngOnInit() {}
  uploadFile(fileType: any, file: any) {
    console.log(fileType, file);
  }
  checkValidation() {
    if (this.comSvc.eventName.trim() != '') return false;
    return true;
  }
}
