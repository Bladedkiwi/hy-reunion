import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScheduleService} from "../schedule.service";
import {ScheduleEvent} from "../schedule-event.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'hfr-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})

/**
 * ScheduleListComponent
 * Initializes the List for the Schedule Events
 */
export class ScheduleListComponent implements OnInit, OnDestroy {
  scheduleEventList: ScheduleEvent[] | undefined;
  scheduleEventSub: Subscription | undefined;
  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.scheduleEventList = this.scheduleService.getScheduleEventList();
    // Get updates on list updates
    this.scheduleEventSub = this.scheduleService.updateScheduleListEvent$.subscribe(
      scheduleEventList => this.scheduleEventList = scheduleEventList);

  }

  ngOnDestroy(): void {
    this.scheduleEventSub?.unsubscribe();
  }

  /**
   * OnSelected
   * Notifies the schedule service that a schedule event has been selected
   * @param scheduleEvent
   */
  onSelected(scheduleEvent: ScheduleEvent): void {
    this.scheduleService.selectedScheduleEvent$.next(scheduleEvent);
  }

  /**
   * GetSpecificList
   * Filters through the main event list for the specific days the events are on
   * and returns that day's worth of events
   * @param day
   */
  getSpecificList(day: string) {
    return this.scheduleEventList?.filter((sEvent) => sEvent.day === day);
  }

  /**
   * CreatePlannedEvent
   * Adds the default Scheduled Event to a specific day
   * @param selectedDay
   */
  createPlannedEvent(selectedDay: string) {
    const defaultPlan = {
      name: 'New Event',
      imageUrl: '',
      url: '',
      details: ['Add Details Here'],
      subject: '',
      notes: '',
      location: ''
    }
      const plannedEvent = new ScheduleEvent(
        '0',selectedDay,'','',null, defaultPlan);
    console.log(plannedEvent);
    this.scheduleService.addPlannedEvent(plannedEvent);
  }
}
