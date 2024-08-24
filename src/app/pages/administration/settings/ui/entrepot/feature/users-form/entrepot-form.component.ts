import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { NotyfService } from "@/shared/services/notyf.service";
import { ngxLoadingAnimationTypes, NgxLoadingModule } from "ngx-loading";
import { EntrepotService } from "@/pages/administration/settings/data-access/entrepots/services/entrepot.services";
import {
  handleStoreUsers,
  handleUpdateUsers,
} from "@/pages/administration/settings/data-access/entrepots/functions/entrepot.functions";
import { UserProfile } from "@/core/entities/user-model";
import { MatButtonModule } from "@angular/material/button";
import { PrimeTemplate } from "primeng/api";
import { DropdownModule } from "primeng/dropdown";
import { NgIf, NgFor, NgClass } from "@angular/common";
import { TooltipModule } from "primeng/tooltip";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { from } from "rxjs";
import Swal, { SweetAlertOptions } from "sweetalert2";

const PrimaryWhite = "#ffffff";
const SecondaryGrey = "#ccc";
@Component({
    selector: "app-users-form",
    templateUrl: "./entrepot-form.component.html",
    styleUrls: ["./entrepot-form.component.scss"],
    standalone: true,
    imports: [
        NgxLoadingModule,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        NgFor,
        DropdownModule,
        PrimeTemplate,
        MatButtonModule,
        NgClass,
        TranslateModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        TableModule,
        ButtonModule,
        TooltipModule,
      
        NgxPaginationModule,
        NgxSkeletonLoaderModule,
    ],
})
export class EntrepotFormComponent implements OnInit {

  public loading = false;
  public form: FormGroup;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public listProfiles: Array<UserProfile> = [];
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  @Output() updateSuccessful = new EventEmitter<void>();

  public formInputs: any[] = [
    {
      label: "FORM_ENTREPOT.SUPERFICIE.LIBELLE",
      placeholder: "FORM_ENTREPOT.SUPERFICIE.PLACEHOLDER",
      name: "superficie",
      type: "text",
      column: 6,
      required: "FORM_ENTREPOT.SUPERFICIE.IS_REQUIRED",
    },
    {
      label: "FORM_ENTREPOT.LIBELLE.LIBELLE",
      placeholder: "FORM_ENTREPOT.LIBELLE.PLACEHOLDER",
      name: "libelle",
      type: "text",
      column: 6,
      required: "FORM_ENTREPOT.LIBELLE.IS_REQUIRED",
    },
    {
      label: "FORM_ENTREPOT.LONGITUDE.LIBELLE",
      placeholder: "FORM_ENTREPOT.LONGITUDE.PLACEHOLDER",
      name: "longitude",
      type: "text",
      column: 12,
      required: "FORM_ENTREPOT.LONGITUDE.IS_REQUIRED",
    },
    {
      label: "FORM_ENTREPOT.LATITUDE.LIBELLE",
      placeholder: "FORM_ENTREPOT.LATITUDE.PLACEHOLDER",
      name: "latitude",
      type: "text",
      column: 6,
      required: "FORM_ENTREPOT.LATITUDE.IS_REQUIRED",
    },
    {
      label: "FORM_ENTREPOT.PLACER.LIBELLE",
      placeholder: "FORM_ENTREPOT.PLACER.PLACEHOLDER",
      name: "placer",
      type: "text",
      column: 6,
      required: "FORM_ENTREPOT.PLACER.IS_REQUIRED",
    },
  ];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EntrepotFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entrepotService: EntrepotService,
    private translate: TranslateService,
    private notyfService: NotyfService,
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.initForm();
    this.loading = false;
  }

  private initForm() {
    this.form = this.fb.group({
      id:[""],
      libelle: ["", [Validators.required]],
      superficie: ["", [Validators.required]],
      longitude: ["", [Validators.required]],
      latitude: ["", [Validators.required]],
      placer: ["", [Validators.required]],

    });

    if (this.data?.type === "edit" && this.data?.property) {
      this.form.patchValue({
        id: this.data?.property?.id,
        superficie: this.data?.property?.superficie,
        libelle: this.data?.property?.libelle,
        longitude: this.data?.property?.longitude,
        latitude: this.data?.property?.latitude,
        placer: this.data?.property?.placer,
      });
    }
  }

  public isFormValid(): boolean {
    return this.form.valid;
  }

  public closeModal() {
    this.dialogRef.close(true);
  }

  async handleUserOperation(operation: () => Promise<any>): Promise<void> {
    try {
      this.loading = true;
      await operation();
    } finally {
      this.loading = false;
    }
  }

  private getSwalStoreOptions(): SweetAlertOptions {
    return {
      title: this.translate.instant('GeneralStrings.CONFIRMATION.TITLE'),
        text: this.translate.instant('GeneralStrings.CONFIRMATION.ADD_TEXT'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.translate.instant('GeneralStrings.CONFIRMATION.CONFIRM_BUTTON'),
        cancelButtonText: this.translate.instant('GeneralStrings.CONFIRMATION.CANCEL_BUTTON'),
    };
  }

  private getSwalUpdateOptions(): SweetAlertOptions {
    return {
      title: this.translate.instant('GeneralStrings.CONFIRMATION.TITLE'),
        text: this.translate.instant('GeneralStrings.CONFIRMATION.UPDATE_TEXT'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.translate.instant('GeneralStrings.CONFIRMATION.CONFIRM_BUTTON'),
        cancelButtonText: this.translate.instant('GeneralStrings.CONFIRMATION.CANCEL_BUTTON'),
    };
  }

  async storeUser(): Promise<void> {
    if (this.isFormValid()) {
      const confirmOptions = this.getSwalStoreOptions();
      const result = await Swal.fire(confirmOptions);
      if (result.isConfirmed) {
        const userData = this.form.getRawValue();
        const { distributeurUserId, ...userDataWithoutId } = userData;
        await this.handleUserOperation(() =>
          handleStoreUsers(
            () => from(this.entrepotService.createEntrepot(userDataWithoutId)),
            this.dialogRef,
            this.notyfService,
          ),
        );
        this.updateSuccessful.emit();
      }
    } else {
      this.showErrorNotification();
    }
  }

  async updateUser(): Promise<void> {
    if (this.isFormValid()) {
      const confirmOptions = this.getSwalUpdateOptions();

      const result = await Swal.fire(confirmOptions);
      
      if (result.isConfirmed) {
        const userData = this.form.getRawValue();
        const id = userData.id;
        await this.handleUserOperation(() =>
          handleUpdateUsers(
            () => from(this.entrepotService.updateEntrepot(id, userData)),
            this.dialogRef,
            this.notyfService,
          ),
        );
        this.updateSuccessful.emit();
      }
    } else {
      this.showErrorNotification();
    }
  }

  private showErrorNotification() {
    this.translate
      .get("GeneralStrings.MessageToast.FORM.REQUIRED_FIELDS")
      .subscribe((translation: string) => {
        this.notyfService.showToast("error", translation, "toast-danger");
      });
  }
}
