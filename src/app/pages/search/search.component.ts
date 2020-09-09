import { User } from "./../../models/user.model";
import { URL_SERVICIOS } from "./../../config/config";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Doctor } from "src/app/models/doctor.model";
import { Hospital } from "src/app/models/hospital.model";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    this.activatedRoute.params.subscribe((params) => {
      let term = params["term"];
      // call function to search term in all collections
      this.search(term);
    });
  }

  ngOnInit(): void {}

  search(text: string) {
    let url = URL_SERVICIOS + "/search/all/" + text;
    this.http.get(url).subscribe((data: any) => {
      this.users = data.users;
      this.doctors = data.doctors;
      this.hospitals = data.hospitals;
    });
  }
}
