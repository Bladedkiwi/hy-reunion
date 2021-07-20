import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SchedulesComponent} from "./schedules/schedules.component";
import {ScheduleDetailComponent} from "./schedules/schedule-detail/schedule-detail.component";



const routes: Routes = [
  {path: '', redirectTo: '/schedules', pathMatch: 'full'},
  {path: 'schedules', component: SchedulesComponent, children: [
      {path: ':id', component: ScheduleDetailComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
