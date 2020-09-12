import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root",
})
export class CheckTokenGuard implements CanActivate {
  constructor(public _userService: UserService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    console.log("token guard");
    let token = this._userService.token;

    // taking back info about the token
    // atob function --> Decode a base-64 encoded string
    let payload = JSON.parse(atob(token.split(".")[1]));
    let expired = this.isExpired(payload.exp);

    if (expired) {
      this.router.navigate(["/login"]);
      return false;
    }

    return true;
  }

  checkRenew(expireDate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(expireDate * 1000); // expiry Date multiplied 1000 to change to milliseconds
      let now = new Date(); // is a better practice to bring the date from the database, not the browser like is doing here
      let extraTime = 1 * 60 * 60 * 1000; // 4 h in miliseconds, time left for token validation

      now.setTime(now.getTime() + extraTime);

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this._userService.renewToken().subscribe((data) => {
          resolve(true);
        }),
          () => {
            this.router.navigate(["/login"]);
            reject(false);
          };
      }
    });
  }

  isExpired(expireDate: number) {
    let now = new Date().getTime() / 1000; // divide 1000 in order to get now time in seconds

    if (expireDate < now) {
      return true;
    } else {
      return false;
    }
  }
}
