import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScheduleEvent} from "../schedule-event.model";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ScheduleService} from "../schedule.service";
import {query} from "@angular/animations";

@Component({
  selector: 'hfr-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit, OnDestroy {
  originalScheduleEvent: ScheduleEvent | undefined;
  editEvent: ScheduleEvent | undefined;
  editEventSub: Subscription | undefined;
  mealForm = new FormGroup({
    name: new FormControl(''),
    mealItems: new FormControl([]),
    mealRecipe: new FormControl(''),
    mealInstructions: new FormControl(''),
    mealUrl: new FormControl(''),
  });
  plannedEventForm = new FormGroup({
    name: new FormControl(''),
    imgUrl: new FormControl(''),
    url: new FormControl(''),
    details: new FormControl([]),
    subject: new FormControl(''),
    notes: new FormControl(''),
    location: new FormControl(''),
  });

  constructor(private scheduleService: ScheduleService, private route: Router, private actRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Creates a copy of the current event to be edited and updates if there is a new one
    this.editEventSub = this.actRoute.params.subscribe(
      (params) => {
        if (!(null?? params.id) || (undefined ?? params.id)) {
          this.originalScheduleEvent = this.scheduleService.getScheduleEventById(params.id);
        }
        if (!(null?? this.originalScheduleEvent) || (undefined ?? this.originalScheduleEvent)) {
          this.editEvent = Object.assign({}, this.originalScheduleEvent);
        }
        return;
      }
    )
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

  /**
   * OnSubmit
   * Sends either the scheduled meal or planned event values to update the existing event entry
   */
  onSubmit(): void {
    if (this.editEvent) {
      if (this.editEvent.plannedEvent) {
        this.scheduleService.updatePlannedEventData(this.editEvent, this.plannedEventForm.value);
      }
      if (this.editEvent.meal) {
        this.scheduleService.updateMealEventData(this.editEvent, this.mealForm.value);
      }
      this.route.navigate(['/schedules/'+ this.editEvent.id]);
    }

  }

}
