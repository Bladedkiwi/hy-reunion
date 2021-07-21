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
  addMenuItem = true;

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

  /**
   * onDeleteMealItem
   * Deletes the selected meal item from the meal object
   * @param selectedDetail
   */
  onAddMealItem(selectedDetail: string): void {
    this.scheduleService.addEventMealItem(selectedDetail, this.nextScheduleEventDetail);
  }

  /**
   * onDeletePlannedItem
   * Deletes the selected event item from the plannedEvent object
   * @param selectedDetail
   */
  onAddPlannedItem(selectedDetail: string): void {
    this.scheduleService.addEventPlannedItem(selectedDetail, this.nextScheduleEventDetail);
  }

  /**
   * onDeleteMealItem
   * Deletes the selected meal item from the meal object
   * @param selectedDetail
   */
  onDeleteMealItem(selectedDetail: string): void {
    this.scheduleService.deleteEventMealItem(selectedDetail, this.nextScheduleEventDetail);
}

  /**
   * onDeletePlannedItem
   * Deletes the selected event item from the plannedEvent object
   * @param selectedDetail
   */
  onDeletePlannedItem(selectedDetail: string): void {
    this.scheduleService.deleteEventPlannedItem(selectedDetail, this.nextScheduleEventDetail);
  }

  /**
   * OnDeletePlannedEvent
   * Deletes planned event from the database and navigates back to the schedules page
   */
  onDeletePlannedEvent() {
    this.scheduleService.deletePlannedEvent(this.nextScheduleEventDetail);
    this.router.navigate(['/schedules']);
  }
}
