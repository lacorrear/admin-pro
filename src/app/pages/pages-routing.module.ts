import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginGuardGuard } from "./../services/guards/login-guard.guard";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PagesComponent } from "./pages.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
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
        data: { title: "User profile" },
      },
      { path: "rxjs", component: RxjsComponent, data: { title: "RxJs" } },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
