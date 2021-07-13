import {ScheduleEvent} from "./schedule-event.model";

export class Schedule {
  constructor(
    public id: string,
    public name: string,
    public items: ScheduleEvent[]) {}
}
