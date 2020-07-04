import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

import { DonutChartComponent } from "../components/donut-chart/donut-chart.component";
import { IncrementorComponent } from "../components/incrementor/incrementor.component";
import { SharedModule } from "../shared/shared.module";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    IncrementorComponent,
    DonutChartComponent,
    AccountSettingsComponent,
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
  ],
})
export class PagesModule {}
