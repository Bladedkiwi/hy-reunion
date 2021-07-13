import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScheduleEvent} from "../schedule-event.model";
import {Subscription} from "rxjs";
import {ScheduleService} from "../schedule.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'hfr-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})

/**
 * Schedule Details
 * Shows the entire details of an event when selected
 */
export class ScheduleDetailComponent implements OnInit, OnDestroy {
  nextScheduleEventDetail: ScheduleEvent | undefined;
  private scheduleDetailSub: Subscription | undefined;

  constructor(private scheduleService: ScheduleService, private actRoute: ActivatedRoute, private router: Router) {
  }

  ngOnDestroy(): void {
    this.scheduleDetailSub?.unsubscribe();

  }

  ngOnInit(): void {
    // Subscribe to the Schedule Service to receive updates on what to show
    this.scheduleDetailSub = this.actRoute.params.subscribe(
      (params: Params) => {
        if (params.id != null || undefined) {
          this.nextScheduleEventDetail = this.scheduleService.getScheduleEventById(params.id);
        }
      }
    )

  }

}
