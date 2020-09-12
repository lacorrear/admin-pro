import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminGuard } from "./../services/guards/admin.guard";
import { CheckTokenGuard } from "./../services/guards/check-token.guard";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DoctorComponent } from "./doctors/doctor/doctor.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { Graph1Component } from "./graph1/graph1.component";
import { HospitalsComponent } from "./hospitals/hospitals.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { SearchComponent } from "./search/search.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [CheckTokenGuard],
    data: { title: "Dashboard" },
  },
  {
    path: "progress",
    component: ProgressComponent,
    data: { title: "ProgressBar" },
  },
  {
    path: "grahp1",
    component: Graph1Component,
    data: { title: "Grahps" },
  },
  {
    path: "promises",
    component: PromisesComponent,
    data: { title: "Promises" },
  },
  {
    path: "account-settings",
    component: AccountSettingsComponent,
    data: { title: "Account Settings" },
  },
  {
    path: "profile",
    component: ProfileComponent,
    data: { title: "User Profile" },
  },
  { path: "rxjs", component: RxjsComponent, data: { title: "RxJs" } },

  //-------------- Maintenance --------------

  {
    path: "users",
    component: UsersComponent,
    canActivate: [AdminGuard],
    data: { title: "Users Maintenance" },
  },
  {
    path: "hospitals",
    component: HospitalsComponent,
    data: { title: "Hospitals Maintenance" },
  },
  {
    path: "doctors",
    component: DoctorsComponent,
    data: { title: "Doctors Maintenance" },
  },
  {
    path: "doctor/:id",
    component: DoctorComponent,
    data: { title: "Update Doctor" },
  },
  {
    path: "search/:term",
    component: SearchComponent,
    data: { title: "Searcher" },
  },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
