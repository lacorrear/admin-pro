import { Injectable } from "@angular/core";
import { URL_SERVICIOS } from "src/app/config/config";

@Injectable({
  providedIn: "root",
})
export class LoadFileService {
  constructor() {}

  loadFile(file: File, type: string, id: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      // See video 14.7
      formData.append("image", file, file.name);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Image upload");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("Image upload went worng");
            reject(xhr.response);
          }
        }
      };

      let url = URL_SERVICIOS + "/upload/" + type + "/" + id;

      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }
}
