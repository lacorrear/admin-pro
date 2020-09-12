import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Subscription } from "rxjs/internal/Subscription";
// import { Observable, Subscription } from "rxjs";
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor() {
    this.subscription = this.returnObservable().subscribe(
      //1 callback: Data
      (data) => console.log("Data:", data),
      //2 callback: Error
      (error) => console.error("ERROR:", error),
      //3 callback: Finish
      () => console.log("Observable finished")
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // console.log("The component is closed");
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable((observer) => {
      let counter = 0;

      let interval = setInterval(() => {
        counter += 1;
        let output = {
          value: counter,
        };
        observer.next(output); //Observable output
        if (counter === 5) {
          clearInterval(interval);
          observer.complete();
        }
        if (counter === 4) {
          observer.error("Caution! observer is equal to 4");
          clearInterval(interval);
        }
      }, 1000);
    }).pipe(
      retry(2),
      map((data: any) => {
        return data.value;
      }),
      // filter only odd values
      filter((value: any) => {
        if (value % 2 === 1) {
          //odd
          return true;
        } else {
          // pair
          return false;
        }
      })
    );
  }
}
