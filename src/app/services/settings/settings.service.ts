import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  // Default values
  userSettings: Settings = {
    themeURL: "assets/css/colors/default.css",
    theme: "default",
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem("userSettings", JSON.stringify(this.userSettings));
    // console.log("User theme saved in local storage");
  }

  loadSettings() {
    let data = localStorage.getItem("userSettings");
    if (data) {
      // console.log("Loading user settings from local storage");
      this.userSettings = JSON.parse(data);
      this.applyTheme(this.userSettings.theme);
    } else {
      // console.log("using default values");
      this.applyTheme(this.userSettings.theme);
    }
  }

  applyTheme(theme: string) {
    let url = `assets/css/colors/${theme}.css`;
    this._document.getElementById("AppTheme").setAttribute("href", url);
    // Saving theme in local storage
    this.userSettings.theme = theme;
    this.userSettings.themeURL = url;
    this.saveSettings();
  }
}

interface Settings {
  themeURL: string;
  theme: string;
}
