import {Component, OnInit} from '@angular/core';
import {Schedule} from "../schedule.model";
import {ScheduleService} from "../schedule.service";
import {ScheduleEvent} from "../schedule-event.model";

@Component({
  selector: 'hfr-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})

/**
 * ScheduleListComponent
 * Initializes the List for the Schedule Events
 */
export class ScheduleListComponent implements OnInit {
  scheduleList: Schedule[] = [];

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.scheduleList = this.scheduleService.getScheduleList();
  }

  /**
   * OnSelected
   * Notifies the schedule service that a schedule event has been selected
   * @param scheduleEvent
   */
  onSelected(scheduleEvent: ScheduleEvent): void {
    this.scheduleService.selectedScheduleItemEvent$.next(scheduleEvent);
  }

}
