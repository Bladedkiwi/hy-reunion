import {Component, Input, OnInit} from '@angular/core';
import {ScheduleEvent} from "../schedule-event.model";

@Component({
  selector: 'hfr-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})

/**
 * ScheduleItem
 * Receives the scheduled event summary for display.
 */
export class ScheduleItemComponent implements OnInit {
  @Input() nextScheduleEvent: ScheduleEvent | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
