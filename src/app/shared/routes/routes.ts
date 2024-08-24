import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "dashboard",
    loadComponent: () =>
      import("../../pages/dashboard/ui/dashboard.component").then(
        (module) => module.DashboardComponent,
      ),
  },
  {
    path: "settings/entrepot",
    loadComponent: () =>
      import("../../pages/administration/settings/ui/entrepot/entrepot.component").then(
        (module) => module.EntrepotComponent,
      ),
  },
];
