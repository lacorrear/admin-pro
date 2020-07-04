import { Component, OnInit } from "@angular/core";
declare function initPlugins(); //see video 7.9

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    initPlugins();
  }
}
