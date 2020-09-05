import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { URL_SERVICIOS } from "src/app/config/config";
import { Hospital } from "src/app/models/hospital.model";
import Swal from "sweetalert2";

import { UserService } from "../user/user.service";
import { LoadFileService } from "./../load-file/load-file.service";

@Injectable({
  providedIn: "root",
})
export class HospitalService {
  hospital: Hospital;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _userservice: UserService,
    public _loadFileService: LoadFileService
  ) {}

  loadHospitals(from: number = 0) {
    let url = URL_SERVICIOS + "/hospital?from=" + from;
    return this.http.get(url);
  }

  getHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.hospital;
      })
    );
  }

  deleteHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + "/hospital/" + hospital._id;
    url += "?token=" + this._userservice.token;

    return this.http.delete(url).pipe(
      map((res) => {
        Swal.fire(
          "Deleted!",
          "Hospital " + hospital.name + " has been deleted.",
          "success"
        );
        return true;
      })
    );
  }

  async createHospital() {
    let url = URL_SERVICIOS + "/hospital?token=" + this._userservice.token;
    let name = await this.inputNewHospital();
    let cancel = new Observable();

    if (!name) {
      return cancel;
    } else {
      return this.http.post(url, { name }).pipe(
        map((res: any) => {
          Swal.fire({
            title: "Hospital Created Successfully",
            text: "New hospital: " + name,
            icon: "success",
            confirmButtonText: "OK",
          });
          return res.hospital;
        })
      );
    }
  }

  async inputNewHospital() {
    const { value: name } = await Swal.fire({
      title: "Enter new hospital name",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    if (name) {
      return name;
    }
  }

  searchHospital(text: string) {
    let url = URL_SERVICIOS + "/search/collection/hospitals/" + text;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.hospitals;
      })
    );
  }

  updateHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + "/hospital/" + hospital._id;
    url += "?token=" + this._userservice.token;

    return this.http.put(url, hospital).pipe(
      map((data: any) => {
        return data.hospital;
      })
    );
  }
}
