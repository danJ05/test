import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "sign-in",
    loadComponent: () =>
      import("./ui/authentication.component").then(
        (module) => module.AuthenticationComponent
      ),
    data: {
      title:
        "Sign In - imako est une plateforme numérique destinée à la gestion des forces de vente et des points de vente.",
    },
  },
  {
    path: "forgot-password",
    loadComponent: () =>
      import("./ui/authentication.component").then(
        (module) => module.AuthenticationComponent
      ),
    data: {
      title:
        "Forgot password - imako est une plateforme numérique destinée à la gestion des forces de vente et des points de vente.",
    },
  },
];
