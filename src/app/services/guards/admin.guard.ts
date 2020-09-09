import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(public _userService: UserService) {}

  canActivate() {
    let role = this._userService.user.role;
    if (role === "ADMIN_ROLE") {
      return true;
    } else {
      console.log("User block due admin guard");
      this._userService.logOut();
      return false;
    }
  }
}
