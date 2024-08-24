import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ngxLoadingAnimationTypes, NgxLoadingModule } from "ngx-loading";
import { Observable } from "rxjs";
import { NotyfService } from "@/shared/services/notyf.service";
import { IndexedDbService } from "@/shared/services/indexed-db.service";
import { handleResetPassword } from "@/pages/authentication/data-access/functions/auth.functions";
import { AuthService } from "@/pages/authentication/data-access/services/auth.service";
import { TranslateModule } from "@ngx-translate/core";
import { NgFor, NgIf } from "@angular/common";

const PrimaryWhite = "#ffffff";
const SecondaryGrey = "#ccc";
@Component({
    selector: "app-forgotpassword-form",
    templateUrl: "./forgot-password-form.component.html",
    styleUrls: ["../authentication.component.scss"],
    standalone: true,
    imports: [
        NgxLoadingModule,
        FormsModule,
        ReactiveFormsModule,
        NgFor,
        NgIf,
        RouterLink,
        TranslateModule,
    ],
})
export class ForgotPasswordFormComponent implements OnInit {
  public form: FormGroup | any;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public formInputs: any[] = [
    {
      label: "FORGOT_PASSWORD.FORM.EMAIL.LIBELLE",
      placeholder: "FORGOT_PASSWORD.FORM.EMAIL.PLACEHOLDER",
      name: "email",
      type: "email",
      required: "FORGOT_PASSWORD.FORM.EMAIL.IS_REQUIRED",
    },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notyfService: NotyfService,
    private indexDbService: IndexedDbService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      email: ["", Validators.required],
    });
  }

  async resetPassword(): Promise<void> {
    this.loading = true;

    const email = this.form.value.email;

    if (!email) {
      this.notyfService.showToast(
        "error",
        "MessageToast.ForgotPassword.REQUIRED_FIELDS",
        "toast-danger",
      );
      this.loading = false;
      return;
    } else {
      const resetPasswordFn = (): Observable<any> => {
        return this.authService.resetPassword({
          email: this.form.value.email,
        });
      };

      handleResetPassword(
        resetPasswordFn,
        this.indexDbService,
        this.notyfService,
        this.router,
      )
        .then(() => {
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.notyfService.showToast("error", error, "toast-danger");
        });
    }
  }
}
