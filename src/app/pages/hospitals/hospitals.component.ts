import { ModaluploadService } from "./../../components/modal-upload/modal-upload.service";
import { Component, OnInit } from "@angular/core";
import { HospitalService } from "src/app/services/service.index";
import { Hospital } from "src/app/models/hospital.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-hospitals",
  templateUrl: "./hospitals.component.html",
  styleUrls: ["./hospitals.component.css"],
})
export class HospitalsComponent implements OnInit {
  hospitals: Hospital[] = [];
  from: number = 0;

  totalRegisters: number = 0;
  isLoading: boolean = true;

  constructor(
    public _hospitalservice: HospitalService,

    public _modaluploadservice: ModaluploadService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();
    this._modaluploadservice.notification.subscribe((resp) => {
      this.loadHospitals();
    });
  }

  showModal(hospitalId: string) {
    this._modaluploadservice.showModal("hospitals", hospitalId);
  }

  // Function for pagination
  // See backend code to modificate the number of users to show/page
  changeFrom(value: number) {
    let fromPagination = this.from + value;

    if (fromPagination >= this.totalRegisters) {
      return;
    }
    if (fromPagination < 0) {
      return;
    }
    this.from += value;

    this.loadHospitals();
  }

  loadHospitals() {
    this.isLoading = true;
    this._hospitalservice.loadHospitals(this.from).subscribe((data: any) => {
      this.totalRegisters = data.total;
      this.hospitals = data.hospitals;
      this.isLoading = false;
    });
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to delete hospital: " + hospital.name,
      icon: "warning",
      showCancelButton: true,
      // confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this._hospitalservice.deleteHospital(hospital).subscribe((deleted) => {
          console.log("is deleted: ", deleted);
          this.loadHospitals();
        });
      }
    });
  }

  async createHospital() {
    (await this._hospitalservice.createHospital()).subscribe((res) => {
      return this.loadHospitals();
    });
  }

  searchHospital(text: string) {
    if (text.length <= 0) {
      this.loadHospitals();
      return;
    }
    this.isLoading = true;
    this._hospitalservice.searchHospital(text).subscribe((data) => {
      this.hospitals = data;
      this.isLoading = false;
    });
  }

  updateHospital(hospital: Hospital) {
    this._hospitalservice.updateHospital(hospital).subscribe((data: any) => {
      Swal.fire({
        title: "Hospital name has been changed successfully",
        text: "New name: " + data.name,
        icon: "success",
        confirmButtonText: "OK",
      });
    });
  }
}
