import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuardGuard implements CanActivate {
  constructor(public _userService: UserService, public router: Router) {}
  canActivate() {
    let isLoggedIn: boolean = this._userService.isLoggedIn();

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      console.log("Blocked due the guard");
      return false;
    }
  }
}
