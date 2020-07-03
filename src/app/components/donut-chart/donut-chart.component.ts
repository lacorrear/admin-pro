import { Component, OnInit, Input } from "@angular/core";
import { ChartType } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";

@Component({
  selector: "donut-chart",
  templateUrl: "./donut-chart.component.html",
  styleUrls: ["./donut-chart.component.css"],
})
export class DonutChartComponent implements OnInit {
  @Input("title") title: string;
  @Input("data") data: MultiDataSet;
  @Input("labels") labels: Label[];
  @Input("chartType") chartType: string = "doughnut";

  //------------ Doughnut Original Data ------------
  // public doughnutChartLabels: Label[] = [
  //   "Download Sales",
  //   "In-Store Sales",
  //   "Mail-Order Sales",
  // ];
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100],
  //   [50, 150, 120],
  //   [250, 130, 70],
  // ];
  // public doughnutChartType: ChartType = "doughnut";
  //------------------------------------------------

  constructor() {}
  ngOnInit(): void {}
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
