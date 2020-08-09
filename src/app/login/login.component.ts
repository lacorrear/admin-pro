import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from "../services/service.index";
import { User } from "../models/user.model";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string;
  rememberUser: boolean = false;
  auth2: any; // The Sign-In object.

  constructor(public _userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.googleInit();
    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 2) {
      this.rememberUser = true;
    }
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "261438668284-ma1nake5b57n5orj4rcrrkb3vgko5q6o.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email",
      });
      this.attachSingin(document.getElementById("btnGoogle"));
    });
  }

  attachSingin(htmlElement) {
    this.auth2.attachClickHandler(htmlElement, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._userService.loginGoogle(token).subscribe(() => {
        // force redirection , in order to not refresh the page
        window.location.href = "#/dashboard";
      });
      // console.log("Token Google user: ", token);
    });
  }

  logIn(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let user = new User(null, form.value.email, form.value.password);
    this._userService.login(user, this.rememberUser).subscribe((data) => {
      this.router.navigate(["/dashboard"]);
    });
  }
}
