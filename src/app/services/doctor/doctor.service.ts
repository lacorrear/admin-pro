import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { URL_SERVICIOS } from "src/app/config/config";

import { UserService } from "../user/user.service";
import { Doctor } from "src/app/models/doctor.model";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class DoctorService {
  constructor(public http: HttpClient, public _userservice: UserService) {}

  loadDoctors(from: number) {
    let url = URL_SERVICIOS + "/doctor?from=" + from;
    return this.http.get(url);
  }

  searchDoctor(text: string) {
    let url = URL_SERVICIOS + "/search/collection/doctors/" + text;
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.doctors;
      })
    );
  }

  deleteDoctor(doctor: Doctor) {
    let url = URL_SERVICIOS + "/doctor/" + doctor._id;
    url += "?token=" + this._userservice.token;
    return this.http.delete(url).pipe(
      map((res) => {
        Swal.fire(
          "Deleted!",
          "Doctor " + doctor.name + " has been deleted.",
          "success"
        );
        return true;
      })
    );
  }

  saveDoctor(doctor: Doctor) {
    let url = URL_SERVICIOS + "/doctor";

    if (doctor._id) {
      // Upadating  Doctor
      url += "/" + doctor._id + "?token=" + this._userservice.token;
      return this.http.put(url, doctor).pipe(
        map((res: any) => {
          Swal.fire(
            "Updated!",
            "Doctor " + doctor.name + " has been Updated.",
            "success"
          );
          return res.doctor;
        })
      );
    } else {
      // Creating new Doctor
      url += "?token=" + this._userservice.token;
      return this.http.post(url, doctor).pipe(
        map((res: any) => {
          Swal.fire(
            "Created!",
            "Doctor " + doctor.name + " has been Created.",
            "success"
          );
          return res.doctor;
        })
      );
    }
  }

  loadDoctorById(id: string) {
    let url = URL_SERVICIOS + "/doctor/" + id;
    return this.http.get(url);
  }
}
