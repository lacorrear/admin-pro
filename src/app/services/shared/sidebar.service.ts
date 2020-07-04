import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  menu: any = [
    {
      title: "Main page",
      icon: "mdi mdi-gauge",
      subMenu: [
        { title: "Dashboard", url: "/dashboard" },
        { title: "ProgressBar", url: "/progress" },
        { title: "Grahp", url: "/grahp1" },
      ],
    },
  ];
  constructor() {}
}
