import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ngxLoadingAnimationTypes, NgxLoadingModule } from "ngx-loading";
import { Observable } from "rxjs";
import { NotyfService } from "@/shared/services/notyf.service";
import { IndexedDbService } from "@/shared/services/indexed-db.service";
import { EncodingDataService } from "@/shared/services/encoding-data.service";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { AuthService } from "@/pages/authentication/data-access/services/auth.service";
import { handleSignIn } from "@/pages/authentication/data-access/functions/auth.functions";
import { NgFor, NgIf } from "@angular/common";

const PrimaryWhite = "#ffffff";
const SecondaryGrey = "#ccc";
@Component({
    selector: "app-signin-form",
    templateUrl: "./signin-form.component.html",
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
export class SignInFormComponent implements OnInit {
  public form: FormGroup | any;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public formInputs: any[] = [
    {
      label: "SIGN_IN.FORM.USERNAME.LIBELLE",
      placeholder: "SIGN_IN.FORM.USERNAME.PLACEHOLDER",
      name: "username",
      type: "text",
      required: "SIGN_IN.FORM.USERNAME.IS_REQUIRED",
    },
    {
      label: "SIGN_IN.FORM.PASSWORD.LIBELLE",
      placeholder: "SIGN_IN.FORM.PASSWORD.PLACEHOLDER",
      name: "password",
      type: "password",
      required: "SIGN_IN.FORM.PASSWORD.IS_REQUIRED",
    },
  ];
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notyfService = inject(NotyfService);
  private indexDbService = inject(IndexedDbService);
  private translate = inject(TranslateService);
  private storage = inject(EncodingDataService);

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.storage.clearData();
  }

  async signIn(): Promise<void> {
    this.loading = true;

    const username = this.form.value.username;
    const password = this.form.value.password;

    if (!username || !password) {
      this.showErrorNotification();
      this.loading = false;
      return;
    } else {
      const signInFn = (): Observable<any> => {
        return this.authService.signIn({
          email: this.form.value.username,
          password: this.form.value.password,
        });
      };

      handleSignIn(
        signInFn,
        this.indexDbService,
        this.notyfService,
        this.storage,
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

  private showErrorNotification() {
    this.translate
      .get("MessageToast.Login.REQUIRED_FIELDS")
      .subscribe((translation: string) => {
        this.notyfService.showToast("error", translation, "toast-danger");
      });
  }
}
