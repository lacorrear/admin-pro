import { Component, OnInit } from "@angular/core";
import { Doctor } from "src/app/models/doctor.model";
import { DoctorService } from "src/app/services/service.index";
import Swal from "sweetalert2";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.css"],
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[];
  isLoading: boolean;
  from: number = 0;
  totalRegisters: number = 5;

  constructor(public _doctorservice: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.isLoading = true;
    this._doctorservice.loadDoctors(this.from).subscribe((data: any) => {
      this.doctors = data.doctors;
      this.totalRegisters = data.total;
      this.isLoading = false;
    });
  }

  changeFrom(value: number) {
    let fromPagination = this.from + value;

    if (fromPagination >= this.totalRegisters) {
      return;
    }
    if (fromPagination < 0) {
      return;
    }
    this.from += value;

    this.loadDoctors();
  }

  searchDoctor(text: string) {
    if (text.length <= 0) {
      this.loadDoctors();
      return;
    }
    this._doctorservice.searchDoctor(text).subscribe((data) => {
      this.doctors = data;
    });
  }

  createDoctor() {}

  updateDoctor(doctor: Doctor) {}

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to delete doctor: " + doctor.name,
      icon: "warning",
      showCancelButton: true,
      // confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this._doctorservice.deleteDoctor(doctor).subscribe((data) => {
          this.loadDoctors();
        });
      }
    });
  }
}
