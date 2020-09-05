import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ModaluploadService } from "src/app/components/modal-upload/modal-upload.service";
import { Doctor } from "src/app/models/doctor.model";
import { Hospital } from "src/app/models/hospital.model";
import { DoctorService, HospitalService } from "src/app/services/service.index";

@Component({
  selector: "app-doctor",
  templateUrl: "./doctor.component.html",
  styleUrls: ["./doctor.component.css"],
})
export class DoctorComponent implements OnInit {
  hospitals: Hospital[];
  doctor = new Doctor("", "", "", "", "");
  hospital = new Hospital("");

  constructor(
    public _hospitalservice: HospitalService,
    public _doctorservice: DoctorService,
    public router: Router,
    public activatedroute: ActivatedRoute,
    public _modalUploadService: ModaluploadService
  ) {
    activatedroute.params.subscribe((params) => {
      let doctorId = params["id"];
      if (doctorId != "new") {
        this.loadDoctorById(doctorId);
      }
    });
  }

  ngOnInit(): void {
    this.loadHospitals();

    this._modalUploadService.notification.subscribe((data) => {
      this.doctor.img = data.doctor.img;
    });
  }

  loadDoctorById(id: string) {
    this._doctorservice.loadDoctorById(id).subscribe((data: any) => {
      this.doctor = data.doctor;
      this.doctor.hospital = data.doctor.hospital._id;
      // To load the hospital image
      this.hospitalOnChange(this.doctor.hospital);
    });
  }

  loadHospitals() {
    this._hospitalservice.loadHospitals().subscribe((data: any) => {
      this.hospitals = data.hospitals;
    });
  }

  saveDoctor(f: NgForm) {
    // console.log(f.valid);
    // console.log(f.value);
    if (f.invalid) {
      return;
    } else {
      this._doctorservice.saveDoctor(this.doctor).subscribe((data) => {
        this.doctor._id = data._id;
        this.router.navigate(["/doctor", data._id]);
      });
    }
  }

  hospitalOnChange(id: string) {
    this._hospitalservice.getHospital(id).subscribe((data: any) => {
      this.hospital = data;
    });
  }

  changePicture() {
    this._modalUploadService.showModal("doctors", this.doctor._id);
  }
}
