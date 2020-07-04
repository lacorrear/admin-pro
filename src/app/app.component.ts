import { SettingsService } from "./services/settings/settings.service";
import { Component, OnInit } from "@angular/core";
declare function initPlugins(); //see video 7.9

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(public _settingsS: SettingsService) {}

  ngOnInit(): void {
    initPlugins();
  }
}
