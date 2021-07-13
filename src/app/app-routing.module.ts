import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SchedulesComponent} from "./schedules/schedules.component";
import {ScheduleDetailComponent} from "./schedules/schedule-detail/schedule-detail.component";
import {AssignmentsComponent} from "./assignments/assignments.component";
import {AssignmentDetailComponent} from "./assignments/assignment-detail/assignment-detail.component";
import {HomeComponent} from "./home/home.component";


const routes: Routes = [
  {path: '', redirectTo: '/schedules', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent
  },
  {path: 'schedules', component: SchedulesComponent, children: [
      {path: ':id', component: ScheduleDetailComponent},
    ],
  },
  {path: 'assignments', component: AssignmentsComponent, children: [
      {path: ':id', component: AssignmentDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
