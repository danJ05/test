import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
    standalone: true,
    imports: [
        NgIf,
        NgxSkeletonLoaderModule,
        TranslateModule,
    ],
})
export class DashboardComponent {
  public listInfoDashb: [];
  constructor() {}
}
