import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-graph1",
  templateUrl: "./graph1.component.html",
  styleUrls: ["./graph1.component.css"],
})
export class Graph1Component implements OnInit {
  //Data from Udemy course
  graficos: any = {
    grafico1: {
      labels: ["Si", "No"],
      data: [80, 20],
      type: "doughnut",
      leyenda: "Do you do exercise?",
    },
    grafico2: {
      labels: ["Swimming", "Jogging", "Soccer"],
      data: [24, 30, 46],
      type: "doughnut",
      leyenda: "Which one?",
    },
    grafico3: {
      labels: ["Male", "Females"],
      data: [4500, 6000],
      type: "doughnut",
      leyenda: "Interviewees",
    },
    grafico4: {
      labels: ["Yes", "No"],
      data: [90, 10],
      type: "doughnut",
      leyenda: "Is exercise important for your health?",
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
