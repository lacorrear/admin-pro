import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { URL_SERVICIOS } from "src/app/config/config";
import Swal from "sweetalert2";

import { User } from "./../../models/user.model";
import { LoadFileService } from "./../load-file/load-file.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  // In order to validate if a user is already login
  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _loadFileService: LoadFileService
  ) {
    this.loadStorage();
  }

  isLoggedIn() {
    return this.token.length ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.token = "";
      this.user = null;
    }
  }

  saveInStogare(id: string, token: string, user: User) {
    // Saving in local storage user data
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";
    // { token } use to send and object no a plane srting (video 13.13)
    return this.http.post(url, { token }).pipe(
      map((data: any) => {
        // Saving in local storage user data
        this.saveInStogare(data.id, data.token, data.user);
        return true;
      })
    );
  }

  login(user: User, rememberUser: boolean) {
    let url = URL_SERVICIOS + "/login";
    return this.http.post(url, user).pipe(
      map((data: any) => {
        // Checking if remenber me option is true
        if (rememberUser) {
          localStorage.setItem("email", user.email);
        } else {
          localStorage.removeItem("email");
        }
        // Saving in local storage user data
        this.saveInStogare(data.id, data.token, data.user);
        return true;
      })
    );
  }

  logOut() {
    this.user = null;
    this.token = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  createUser(user: User) {
    let url = URL_SERVICIOS + "/user";
    // Use return in order to get an observable as an answer
    return this.http.post(url, user).pipe(
      map((data: any) => {
        Swal.fire({
          title: "User Created Successfully",
          text: user.email,
          icon: "success",
          confirmButtonText: "OK",
        });
        return data.user;
      })
    );
  }

  updateUser(user: User) {
    let url = URL_SERVICIOS + "/user/" + user._id + "?token=" + this.token;

    return this.http.put(url, user).pipe(
      map((data: any) => {
        // Saving user updates in local storage
        if (user._id === this.user._id) {
          let userDB: User = data.user;
          this.saveInStogare(userDB._id, this.token, userDB);
        }
        // Alert to confirm everything went OK
        Swal.fire({
          icon: "success",
          title: "User profile updated",
          text: user.name,
          showConfirmButton: true,
        });

        return true;
      })
    );
  }

  changeImage(file: File, id: string) {
    this._loadFileService
      .loadFile(file, "users", id)
      .then((resp: any) => {
        // Saving user updates in local storage
        this.user.img = resp.user.img;
        this.saveInStogare(id, this.token, this.user);
        // Alert to confirm everything went OK
        Swal.fire({
          icon: "success",
          title: "User profile updated",
          text: this.user.name,
          showConfirmButton: true,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  loadUsers(from: number = 0) {
    let url = URL_SERVICIOS + "/user?from=" + from;
    return this.http.get(url);
  }

  searchUsers(text: string) {
    let url = URL_SERVICIOS + "/search/collection/users/" + text;
    return this.http.get(url).pipe(map((data: any) => data.users));
  }

  deleteUser(id: string) {
    let url = URL_SERVICIOS + "/user/" + id + "?token=" + this.token;
    return this.http.delete(url).pipe(
      map((res) => {
        Swal.fire("Deleted!", "User has been deleted.", "success");
        return true;
      })
    );
  }
}
