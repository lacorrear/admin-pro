import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-incrementor",
  templateUrl: "./incrementor.component.html",
  styleUrls: ["./incrementor.component.css"],
})
export class IncrementorComponent implements OnInit {
  @ViewChild("txtProgress") txtProgress: ElementRef;
  @Input("name")
  name: string = "Name1";
  @Input("percent") percent: number = 25;
  @Output("valueChanged")
  valueChanged: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  changeValue(value: number) {
    if (this.percent >= 100 && value > 0) {
      this.percent = 100;
      return;
    }
    if (this.percent <= 0 && value < 0) {
      this.percent = 0;
      return;
    }
    this.percent += value;
    this.valueChanged.emit(this.percent);
    this.txtProgress.nativeElement.focus();
  }

  onChange(value: number) {
    // let inputValue: any = document.getElementsByName("progressValue")[0];

    if (value >= 100) {
      this.percent = 100;
    } else if (value <= 0) {
      this.percent = 0;
    } else {
      this.percent = value;
    }
    // inputValue.value = Number(this.percent);
    this.txtProgress.nativeElement.value = Number(this.percent);
    this.valueChanged.emit(this.percent);
  }
}
