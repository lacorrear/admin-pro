import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

import { LoadFileService } from "./../../services/load-file/load-file.service";
import { ModaluploadService } from "./modal-upload.service";

@Component({
  selector: "app-modalupload",
  templateUrl: "./modal-upload.component.html",
  styleUrls: ["./modal-upload.component.css"],
})
export class ModaluploadComponent implements OnInit {
  imageName: string = "";
  temporalImage: string | ArrayBuffer;
  uploadImage: File;

  constructor(
    public _loadfileservice: LoadFileService,
    public _modaluploadservice: ModaluploadService
  ) {}

  ngOnInit(): void {}

  imageSelecting(file: File) {
    if (!file) {
      this.uploadImage = null;
      return;
    }

    if (file.type.indexOf("image") < 0) {
      // Alert to confirm everything went OK
      Swal.fire({
        icon: "error",
        title: "Only pictures files",
        text: "The selected file is not an image",
        showConfirmButton: true,
      });
      this.uploadImage = null;
      return;
    }

    this.uploadImage = file;
    this.imageName = file.name;

    //show temporal image
    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.temporalImage = reader.result;
    };
  }

  loadImage() {
    let type = this._modaluploadservice.type;
    let id = this._modaluploadservice.id;
    let notification = this._modaluploadservice.notification;

    this._loadfileservice
      .loadFile(this.uploadImage, type, id)
      .then((resp) => {
        notification.emit(resp);
        this.closeModal();
      })
      .catch((err) => {
        console.log("error loading file");
      });
  }

  closeModal() {
    this.temporalImage = null;
    this.uploadImage = null;
    this._modaluploadservice.hideModal();
  }
}
