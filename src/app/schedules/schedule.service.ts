import { Injectable } from "@angular/core";
import { MOCKSCHEDULES } from "./MOCKSCHEDULES";
import { Schedule } from "./schedule.model";
import { ScheduleEvent } from "./schedule-event.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  scheduleEventList: ScheduleEvent[] = [];
  selectedScheduleEvent$ = new Subject<ScheduleEvent>();
  // updateScheduleListEvent$ = new Subject<any[]>();

  constructor() {
    this.scheduleEventList = MOCKSCHEDULES;
  }

  getScheduleEventList(): ScheduleEvent[] {
    return this.scheduleEventList;
  }

  getScheduleEventById(id: string): ScheduleEvent {
    return <ScheduleEvent>this.scheduleEventList.find(scheduleEvent => (scheduleEvent.id === id ? scheduleEvent : null));
    // let mockScheduleEvent: any;
    // this.scheduleEventList.forEach((schedule) => {
    //   for (const item of schedule) {
    //     if (item.id === id) {
    //       mockScheduleEvent = item;
    //     }
    //   }
    //   if (mockScheduleEvent instanceof ScheduleEvent) {
    //     return;
    //   }
    // });
    // console.log("return successful");
    // // @ts-ignore
    // if (!(mockScheduleEvent ?? null) || (mockScheduleEvent ?? undefined)) {
    //   return mockScheduleEvent;
    // }
    // else {
    //   // @ts-ignore
    //   return;
    // }
  }
  // End of getScheduleEventById

  updateScheduleEvent(originalEvent: ScheduleEvent, newEvent: ScheduleEvent): void {
    // create a base position
    let pos = 0;

    // Check which event is being updated
    if (newEvent) {
      pos = this.scheduleEventList.indexOf(originalEvent);
      if (!(pos < 0)) {
        newEvent.id = originalEvent.id;
      }
    }
    // Update the contents of the event

    // add the event back into the database
  }
}
