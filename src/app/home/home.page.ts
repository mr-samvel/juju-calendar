import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomePage {
  @ViewChild(CalendarComponent, null) calendarComponent: CalendarComponent;
  public eventSource: Array<{startTime: Date, type: number, endTime: Date}>;
  public viewTitle: string;

  public today: Date;
  public isToday: boolean;

  public jujuDays: number;
  public mumuDays: number;
  public pousadaDays: number;

  public calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date()
  };

  constructor(private changeDetector: ChangeDetectorRef) {
    this.eventSource = new Array();
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
  }

  public onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  public setToday() {
    this.calendar.currentDate = new Date();
  }

  public onTimeSelected(ev) {
    let startTime = ev.selectedTime;
    let endTime = new Date(startTime);
    endTime.setHours(23);
    let type = 1;
    if (ev.events[0])
      type = (ev.events[0].type + 1) % 4;
    let event = {startTime: startTime, type: type, endTime: endTime};
    let index = this.eventSource.indexOf(ev.events[0]);
    if (~index)
      this.eventSource[index] = event;
    else
      this.eventSource.push(event);
    this.calendarComponent.loadEvents();
  }

  public onCurrentDateChanged(event: Date) {
    event.setHours(0, 0, 0, 0);
    this.isToday = this.today.getTime() === event.getTime();
    this.changeDetector.detectChanges();
  }

  public getMonthviewEventColor(events) {
    if (events[0])
      return 'event'+events[0].type;
  }

  public resetEvents() {
    this.eventSource = new Array();
    console.log("TODO: RESET EVENTS");
  }

  public storeEvents() {
    console.log("TODO: STORE EVENTS");
  }
  // https://github.com/twinssbc/Ionic2-Calendar
  // https://ionicframework.com/docs/native/native-storage
}
