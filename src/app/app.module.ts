import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ScheduleListComponent } from './schedules/schedule-list/schedule-list.component';
import { ScheduleItemComponent } from './schedules/schedule-item/schedule-item.component';
import { ScheduleDetailComponent } from './schedules/schedule-detail/schedule-detail.component';
import { HeaderComponent } from "./header.component";
import { ScheduleEditComponent } from './schedules/schedule-edit/schedule-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SchedulesComponent,
    ScheduleListComponent,
    ScheduleItemComponent,
    ScheduleDetailComponent,
    HeaderComponent,
    ScheduleListComponent,
    ScheduleEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
