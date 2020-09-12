import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

import { DonutChartComponent } from "../components/donut-chart/donut-chart.component";
import { IncrementorComponent } from "../components/incrementor/incrementor.component";
import { SharedModule } from "../shared/shared.module";
import { PipesModule } from "./../pipes/pipes.module";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./users/users.component";
import { ModaluploadComponent } from "../components/modal-upload/modal-upload.component";
import { HospitalsComponent } from "./hospitals/hospitals.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { DoctorComponent } from "./doctors/doctor/doctor.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
  declarations: [
    // PagesComponent,
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    IncrementorComponent,
    DonutChartComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    // ModaluploadComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchComponent,
  ],
  exports: [
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    IncrementorComponent,
    DonutChartComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ChartsModule,
    PipesModule,
  ],
})
export class PagesModule {}
