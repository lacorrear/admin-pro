import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { URL_SERVICIOS } from "src/app/config/config";
import Swal from "sweetalert2";

import { User } from "./../../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  // In order to validate if a user is already login
  user: User;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
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
}
