import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SchedulesComponent} from "./schedules/schedules.component";
import {ScheduleDetailComponent} from "./schedules/schedule-detail/schedule-detail.component";
import {ScheduleEditComponent} from "./schedules/schedule-edit/schedule-edit.component";



const routes: Routes = [
  {path: '', redirectTo: '/schedules', pathMatch: 'full'},
  {path: 'schedules', component: SchedulesComponent, children: [
      {path: ':id', component: ScheduleDetailComponent},
      {path: ':id/edit', component: ScheduleEditComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
