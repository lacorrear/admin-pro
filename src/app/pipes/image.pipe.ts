import { Pipe, PipeTransform } from "@angular/core";
import { URL_SERVICIOS } from "../config/config";

@Pipe({
  name: "image",
})
export class ImagePipe implements PipeTransform {
  transform(img: string, type: string = "user"): any {
    let url = URL_SERVICIOS + "/image";

    if (!img) {
      // logic made in the backend, return a no image picture
      return url + "/users/xx";
    } else {
      // Google image validation
      if (img.indexOf("https") >= 0) {
        return img;
      } else {
        let url = URL_SERVICIOS + "/image";

        if (!img) {
          // logic made in the backend, return a no image picture
          return url + "/users/xx";
        } else {
          switch (type) {
            case "user":
              url += "/users/" + img;
              break;
            case "doctor":
              url += "/doctors/" + img;
              break;
            case "hospital":
              url += "/hospitals/" + img;
              break;
            default:
              console.log(" Image type does not exits");
              url += "/users/xx";
          }
          return url;
        }
      }
    }
  }
}
