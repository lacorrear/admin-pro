import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { Graph1Component } from "./pages/graph1/graph1.component";
import { ProgressComponent } from "./pages/progress/progress.component";
import { BreadcrumbsComponent } from "./shared/breadcrumbs/breadcrumbs.component";
import { HeaderComponent } from "./shared/header/header.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { PagesComponent } from "./pages/pages.component";
import { RegisterComponent } from "./login/register.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent,
    RegisterComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
