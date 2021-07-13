import { Component, OnInit, OnDestroy } from '@angular/core';
import { Schedule } from "./schedule.model";
import { ScheduleEvent } from "./schedule-event.model";
import { ScheduleService } from "./schedule.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'hfr-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit, OnDestroy {
  selectedScheduleItem: ScheduleEvent | undefined;
  private selectedScheduleSub: Subscription | undefined;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.selectedScheduleSub = this.scheduleService.selectedScheduleItemEvent$
      .subscribe((schedule: ScheduleEvent) => {
        this.selectedScheduleItem = schedule;
      })
  }

  ngOnDestroy(): void {
    this.selectedScheduleSub?.unsubscribe();
  }

}
