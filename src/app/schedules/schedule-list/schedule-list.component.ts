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
  scheduleEventList: ScheduleEvent[] | undefined;
  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.scheduleEventList = this.scheduleService.getScheduleEventList()

  }

  /**
   * OnSelected
   * Notifies the schedule service that a schedule event has been selected
   * @param scheduleEvent
   */
  onSelected(scheduleEvent: ScheduleEvent): void {
    this.scheduleService.selectedScheduleEvent$.next(scheduleEvent);
  }

  getSpecificList(day: string) {
    return this.scheduleEventList?.filter((sEvent) => sEvent.day === day);
  }
}
