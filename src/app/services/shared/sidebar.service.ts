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
        { title: "Promises", url: "/promises" },
        { title: "RxJs", url: "/rxjs" },
      ],
    },
    {
      title: "Maintenance",
      icon: "mdi mdi-folder-lock-open",
      subMenu: [
        { title: "Users", url: "/users" },
        { title: "Doctors", url: "/doctors" },
        { title: "Hospitals", url: "/hospitals" },
      ],
    },
  ];
  constructor() {}
}
