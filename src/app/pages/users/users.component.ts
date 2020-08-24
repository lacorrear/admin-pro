import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/service.index";
import Swal from "sweetalert2";

import { ModaluploadService } from "./../../components/modal-upload/modal-upload.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styles: [],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  from: number = 0;

  totalRegisters: number = 0;
  isLoading: boolean = true;

  constructor(
    public _userService: UserService,
    public _modaluploadservice: ModaluploadService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this._modaluploadservice.notification.subscribe((resp) => {
      this.loadUsers();
    });
  }

  loadUsers() {
    this.isLoading = true;

    this._userService.loadUsers(this.from).subscribe((data: any) => {
      this.totalRegisters = data.total;
      this.users = data.users;
      this.isLoading = false;
    });
  }

  // Function for pagination
  // See backend code to modificate the number of users to show/page
  changeFrom(value: number) {
    let fromPagination = this.from + value;

    if (fromPagination >= this.totalRegisters) {
      return;
    }
    if (fromPagination < 0) {
      return;
    }
    this.from += value;

    this.loadUsers();
  }

  searchUser(text: string) {
    if (text.length <= 0) {
      this.loadUsers();
      return;
    }
    this.isLoading = true;
    this._userService.searchUsers(text).subscribe((data: User[]) => {
      this.users = data;
      this.isLoading = false;
    });
  }

  deleteUser(user: User) {
    //this._userService.user._id, Is the user login id
    if (user._id === this._userService.user._id) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can not delete your own user account",
      });
      return;
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You are going to delete user: " + user.name,
        icon: "warning",
        showCancelButton: true,
        // confirmButtonColor: "#3085d6",
        // cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this._userService.deleteUser(user._id).subscribe((deleted) => {
            console.log("is deleted: ", deleted);
            this.loadUsers();
          });
        }
      });
    }
  }

  saveUser(user: User) {
    this._userService.updateUser(user).subscribe();
  }

  showModal(userId: string) {
    this._modaluploadservice.showModal("users", userId);
  }
}
