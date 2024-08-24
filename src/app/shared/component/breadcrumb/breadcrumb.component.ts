import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-breadcrumb",
    templateUrl: "./breadcrumb.component.html",
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        TranslateModule,
        CommonModule
    ],
})
export class BreadcrumbComponent {
  @Input() breadcrumb: any;
}
