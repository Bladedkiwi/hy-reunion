import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScheduleEvent} from "../schedule-event.model";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ScheduleService} from "../schedule.service";

@Component({
  selector: 'hfr-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit, OnDestroy {
  editEvent: ScheduleEvent | undefined;
  editEventSub: Subscription | undefined;

  constructor(private scheduleService: ScheduleService, private route: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.editEventSub?.unsubscribe();
  }

  /**
   * onCancel
   * Returns user back to the schedules page
   */
  onCancel(): void {
    this.route.navigate(['/schedules']);
  }

  onSubmit(form: NgForm): void {}
}
