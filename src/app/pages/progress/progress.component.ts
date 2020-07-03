import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.css"],
})
export class ProgressComponent implements OnInit {
  percent1: number = 45;
  percent2: number = 75;
  constructor() {}

  ngOnInit(): void {}
}
