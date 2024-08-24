import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "app-footer-auth",
    templateUrl: "./footer-auth.component.html",
    styleUrls: ["../authentication.component.scss"],
    standalone: true,
    imports: [TranslateModule],
})
export class FooterAuthComponent {}
