import { Router } from "@angular/router";
import { User } from "./../../models/user.model";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/service.index";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(public _userService: UserService, public router: Router) {}

  ngOnInit(): void {
    this.user = this._userService.user;
  }

  search(text: string) {
    this.router.navigate(["/search", text]);
  }
}
