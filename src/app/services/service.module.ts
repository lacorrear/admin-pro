import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  LoginGuardGuard,
} from "./service.index";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuardGuard,
  ],
  imports: [CommonModule, HttpClientModule],
})
export class ServiceModule {}
