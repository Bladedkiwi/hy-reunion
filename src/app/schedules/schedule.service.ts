import { Injectable } from "@angular/core";
import { MOCKSCHEDULES } from "./MOCKSCHEDULES";
import { Schedule } from "./schedule.model";
import { ScheduleEvent } from "./schedule-event.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  scheduleList: Schedule[] = [];
  selectedScheduleItemEvent$ = new Subject<ScheduleEvent>();
  // updateScheduleListEvent$ = new Subject<any[]>();

  constructor() {
    this.scheduleList = MOCKSCHEDULES;
  }

  getScheduleList(): Schedule[] {
    return this.scheduleList;
  }

  getScheduleEventById(id: string): ScheduleEvent {
    let mockScheduleEvent: any;
    this.scheduleList.forEach((schedule) => {
      for (const item of schedule.items) {
        if (item.id === id) {
          mockScheduleEvent = item;
        }
      }
      if (mockScheduleEvent instanceof ScheduleEvent) {
        return;
      }
    });
    console.log("return successful");
    // @ts-ignore
    if (!(mockScheduleEvent ?? null) || (mockScheduleEvent ?? undefined)) {
      return mockScheduleEvent;
    }
    else {
      // @ts-ignore
      return;
    }
  }

}
