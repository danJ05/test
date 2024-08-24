import { Routes } from "@angular/router";

export const full: Routes = [

  {
    path:"auth/sign-in",
    loadComponent: () => import('../../pages/authentication/ui/authentication.component').then(m => m.AuthenticationComponent)
  },
  {
    path:"auth/forgot-password",
    loadComponent: () => import('../../pages/authentication/ui/authentication.component').then(m => m.AuthenticationComponent)
  }
];
