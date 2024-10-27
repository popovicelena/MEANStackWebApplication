import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  public minDate: Date = new Date ("05/07/2017");
  public maxDate: Date = new Date ("08/27/2017");
  public value: Date = new Date ("05/16/2017");
  constructor () {}

}
