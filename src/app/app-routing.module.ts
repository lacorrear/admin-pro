import { LoginGuardGuard } from "./services/guards/login-guard.guard";
import { PagesComponent } from "./pages/pages.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";

const routes: Routes = [
  // Nested routing
  // https://www.freakyjolly.com/angular-nested-routing-with-multiple-routeroutlet-using-loadchildren-having-own-router-modules-example-application/#.Xvko0ChKhhE
  // {
  //   path: "",
  //   loadChildren: () =>
  //     import(`./pages/pages.module`).then((m) => m.PagesModule),
  // },

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  // LazyLoad video 18.2
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  { path: "**", component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
