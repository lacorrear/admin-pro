import { UserService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: User;
  imageName: string = "";
  temporalImage: string | ArrayBuffer;
  uploadImage: File;

  constructor(public _userService: UserService) {}

  ngOnInit(): void {
    this.user = this._userService.user;
  }

  save(user: User) {
    if (!this.user.google) {
      this.user.email = user.email;
    }
    this.user.name = user.name;
    this._userService.updateUser(this.user).subscribe();
  }

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

  changeImage() {
    this._userService.changeImage(this.uploadImage, this.user._id);
  }
}
