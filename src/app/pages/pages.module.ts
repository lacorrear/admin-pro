import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
  ],
  exports: [DashboardComponent, Graph1Component, ProgressComponent],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
})
export class PagesModule {}
