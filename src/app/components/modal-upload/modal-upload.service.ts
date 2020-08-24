import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ModaluploadService {
  public type: string;
  public id: string;

  public isHide: string = "hide";
  // tell the app that the image is already load
  public notification = new EventEmitter<any>();

  constructor() {}

  hideModal() {
    this.isHide = "hide";
    this.id = null;
    this.type = null;
  }

  showModal(type: string, id: string) {
    this.isHide = "";
    this.id = id;
    this.type = type;
  }
}
