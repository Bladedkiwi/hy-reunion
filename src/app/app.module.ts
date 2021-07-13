import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { HomeComponent } from './home/home.component';
import { ScheduleListComponent } from './schedules/schedule-list/schedule-list.component';
import { ScheduleItemComponent } from './schedules/schedule-item/schedule-item.component';
import { ScheduleDetailComponent } from './schedules/schedule-detail/schedule-detail.component';
import { AssignmentListComponent } from './assignments/assignment-list/assignment-list.component';
import { AssignmentItemComponent } from './assignments/assignment-item/assignment-item.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
// import { DropdownMenuDirective } from "./shared/dropdown.directive";
import { HeaderComponent } from "./header.component";

@NgModule({
  declarations: [
    AppComponent,
    SchedulesComponent,
    AssignmentsComponent,
    HomeComponent,
    ScheduleListComponent,
    ScheduleItemComponent,
    ScheduleDetailComponent,
    AssignmentListComponent,
    AssignmentItemComponent,
    AssignmentDetailComponent,
    HeaderComponent,
    ScheduleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
