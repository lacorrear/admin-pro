import { User } from "./../../models/user.model";
import { UserService } from "./../../services/user/user.service";
import { Component, OnInit } from "@angular/core";
import { SidebarService } from "../../services/service.index";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  user: User;
  constructor(
    public _sidebarS: SidebarService,
    public _userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this._userService.user;
    this._sidebarS.loadMenu();
  }
}
