import { Router, ActivationEnd } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { filter, map } from "rxjs/operators";
import { Title, Meta, MetaDefinition } from "@angular/platform-browser";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.css"],
})
export class BreadcrumbsComponent implements OnInit {
  label: string = "";

  constructor(private router: Router, public _title: Title, public meta: Meta) {
    this.getDataRoute().subscribe((data) => {
      this.label = data.title;
      // text in the "pestaña"
      this._title.setTitle(this.label);

      let metaTag: MetaDefinition = {
        // see https://angular.io/api/platform-browser/Meta
        name: "Description",
        content: this.label,
      };
      this.meta.updateTag(metaTag);
    });
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter((event) => {
        return event instanceof ActivationEnd;
      }),
      filter((eventAE: ActivationEnd) => {
        return eventAE.snapshot.firstChild === null;
      }),
      map((eventAE) => {
        return eventAE.snapshot.data;
      })
    );
  }

  ngOnInit(): void {}
}
