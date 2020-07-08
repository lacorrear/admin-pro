import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promises",
  templateUrl: "./promises.component.html",
  styleUrls: ["./promises.component.css"],
})
export class PromisesComponent implements OnInit {
  constructor() {
    this.count3()
      .then((message) => {
        console.log("Successfully finished ", message);
      })
      .catch((error) => {
        console.error("Promise error:", error);
      });
  }

  ngOnInit(): void {}

  count3(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let counter = 0;

      let interval = setInterval(() => {
        counter += 1;
        console.log(counter);

        if (counter === 3) {
          resolve(true);
          // reject("Something went wrong");
          // stop the function
          clearInterval(interval);
        }
      }, 1000);
    });
  }
}
