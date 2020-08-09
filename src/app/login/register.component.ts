import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { User } from "./../models/user.model";
import { UserService } from "./../services/service.index";

// is already declare in the app.component.ts
// declare function init_plugins();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"],
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  areEqual(field1: string, field2: string) {
    return (group: FormGroup) => {
      let value1 = group.controls[field1].value;
      let value2 = group.controls[field2].value;

      if (value1 === value2) {
        return null;
      } else {
        return {
          areEqual: true,
        };
      }
    };
  }

  constructor(public _userService: UserService, public router: Router) {}

  ngOnInit() {
    this.forma = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        terms: new FormControl(false),
      },
      { validators: this.areEqual("password", "password2") }
    );

    // Setting default values in the form
    this.forma.setValue({
      name: "Test1",
      email: "test1@test.com",
      password: "123",
      password2: "123",
      terms: true,
    });
  }

  registerUser() {
    if (this.forma.invalid) {
      return;
    }
    // Checking - agree to all Terms
    if (!this.forma.value.terms) {
      Swal.fire({
        title: "Important!",
        text: "You must agree to all terms",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    // In this point form is valid
    // console.log(this.forma.value);
    let user = new User(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password
    );
    this._userService.createUser(user).subscribe((data) => {
      // console.log(data);
      this.router.navigate(["/login"]);
    });
  }
}
