import { Component, OnInit, Inject } from "@angular/core";
import { SettingsService } from "src/app/services/service.index";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrls: ["./account-settings.component.css"],
})
export class AccountSettingsComponent implements OnInit {
  constructor(public _settingsS: SettingsService) {}

  ngOnInit(): void {
    this.putCheck();
  }

  changeColor(theme: string, link: any) {
    this.applyCheck(link);
    this._settingsS.applyTheme(theme);
  }

  applyCheck(link: any) {
    let selectors: any = document.getElementsByClassName("selector");

    for (let ref of selectors) {
      ref.classList.remove("working");
    }

    link.classList.add("working");
  }

  putCheck() {
    let selectors: any = document.getElementsByClassName("selector");
    let theme = this._settingsS.userSettings.theme;
    for (let ref of selectors) {
      if (theme === ref.getAttribute("data-theme")) {
        ref.classList.add("working");
        break;
      }
    }
  }
}
