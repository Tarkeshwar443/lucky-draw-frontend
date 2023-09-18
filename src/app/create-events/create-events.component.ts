import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.scss'],
})
export class CreateEventsComponent {
  eventName: string = 'asfasf';
  constructor(public comSvc: CommonService) {}
  ngOnInit() {
    console.log(this.eventName);
  }
}
