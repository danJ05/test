import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { FooterAuthComponent } from "./footer-auth/footer-auth.component";
import { ForgotPasswordFormComponent } from "./forgot-password-form/forgot-password-form.component";
import { SignInFormComponent } from "./signin-form/signin-form.component";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-authentication",
    templateUrl: "./authentication.component.html",
    styleUrls: ["./authentication.component.scss"],
    standalone: true,
    imports: [
        NgIf,
        SignInFormComponent,
        ForgotPasswordFormComponent,
        FooterAuthComponent,
        TranslateModule,
    ],
})
export class AuthenticationComponent {
  public currentRoute: string;
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) {
    this.route.url.subscribe((segments) => {
      this.currentRoute = segments.map(segment => segment.path).join('/');
      console.log("information in currentRoute", this.currentRoute);
    });
    this.route.data.subscribe((data) => {
      this.titleService.setTitle(data.title);
    });
  }
}
