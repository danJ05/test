import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { Table, TableModule } from "primeng/table";
import { Subscription, from } from "rxjs";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { DateFormatService } from "@/shared/utils/date-format.service";
import { NotyfService } from "@/shared/services/notyf.service";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { EntrepotService } from "@/pages/administration/settings/data-access/entrepots/services/entrepot.services";
import {
  handleDeleteUsers,
  handleGetAllUsers,
} from "@/pages/administration/settings/data-access/entrepots/functions/entrepot.functions";
import { EntrepotFormComponent } from "@/pages/administration/settings/ui/entrepot/feature/users-form/entrepot-form.component";
import { UserModel } from "@/core/entities/user-model";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { ButtonDirective, ButtonModule } from "primeng/button";
import { PrimeTemplate } from "primeng/api";
import { NgIf, NgFor } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { BreadcrumbComponent } from "../../../../../shared/component/breadcrumb/breadcrumb.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { DropdownModule } from "primeng/dropdown";
import { TooltipModule } from "primeng/tooltip";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxLoadingModule } from "ngx-loading";

interface DialogData {
  type: string;
  property: any;
}
@Component({
    selector: "app-entrepot",
    templateUrl: "./entrepot.component.html",
    styleUrls: ["./entrepot.component.scss"],
    standalone: true,
    imports: [
        BreadcrumbComponent,
        MatCardModule,
        MatButtonModule,
        NgIf,
        TableModule,
        PrimeTemplate,
        NgFor,
        ButtonDirective,
        NgxSkeletonLoaderModule,
        TranslateModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        ButtonModule,
        DropdownModule,
        TooltipModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgxLoadingModule,
    ],
})
export class EntrepotComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("dt") dt: Table;
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.dt.filterGlobal(value, "contains");
  }
  public breadcrumbObject: any = {
    first: "FORM_ENTREPOT.BREADCRUMB.FIRST",
    second: "FORM_ENTREPOT.BREADCRUMB.SECOND",
  };
  public response: any;
  public columns = [
    {
      field: "libelle",
      header: "FORM_ENTREPOT.COLUMNS.0.header",
      isText: true,
      isCenter: true,
    },
    {
      field: "superficie",
      header: "FORM_ENTREPOT.COLUMNS.1.header",
      isText: true,
      isCenter: true,
    },
    {
      field: "longitude",
      header: "FORM_ENTREPOT.COLUMNS.2.header",
      isText: true,
      isCenter: true,
    },
    {
      field: "latitude",
      header: "FORM_ENTREPOT.COLUMNS.3.header",
      isText: true,
      isCenter: true,
    },
    {
      field: "placer",
      header: "FORM_ENTREPOT.COLUMNS.4.header",
      isText: true,
      isCenter: true,
    },
  ];
  public globalFilterFieldsObject: string[] = [
    "placer",
    "latitude",
    "longititude",
    "superficie",
    "libelle",
  ];
  public  listHistoryEntrepot: any = [];
  private subscriptions: Subscription = new Subscription();
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private EntrepotService = inject(EntrepotService);
  private translate = inject(TranslateService);
  private dateFormatService  = inject(DateFormatService);
  private notyfService = inject(NotyfService);


  async ngOnInit() {
    this.subscribeToRouteData();
    this.subscribeToUserStorage();
  }

  async ngAfterViewInit() {
    await this.loadAllHistoryEntrepot();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private subscribeToRouteData(): void {
    this.subscriptions.add(
      this.route.data.subscribe((data) => {
        const title = data["title"] || "Default Title";
        this.titleService.setTitle(title);
      }),
    );
  }

  private async subscribeToUserStorage() {
    this.subscriptions.add();
  }

  public async loadAllHistoryEntrepot(): Promise<void> {
    try {
      this.response = await handleGetAllUsers(
        () => this.EntrepotService.getAllEntrepot(),
        this.notyfService,
      );
    
      if (Array.isArray(this.response) && this.response.length > 0) {
        this.listHistoryEntrepot = this.response.map((module) =>
          this.mapModuleDates(module),
        );
      } else {
        this.notyfService.showToast("error", "No data found", "toast-warning");
      }
  
    } catch (err) {
      this.notyfService.showToast("error", "Failed to load users", "toast-danger");
    }
  }
  
  

  private mapModuleDates(module: any): UserModel {
    return {
      ...module,
      createdon: this.dateFormatService.formatIsoDate(module.createdon),
      updatedon: this.dateFormatService.formatIsoDate(module.updatedon),
    };
  }

  public openDialogHistoryEntrepot(type: string, data: UserModel): void {
    let dialogData: DialogData = { type: type, property: {} };
    dialogData.property = type === "edit" ? data : dialogData.property;
    const dialogRef = this.dialog.open(EntrepotFormComponent, {
      width: "600px",
      data: dialogData,
    });
    const instance = dialogRef.componentInstance;
    instance.updateSuccessful.subscribe(() => {
      this.loadAllHistoryEntrepot();
    });
  }

  public async handleDeleteHistoryEntrepot(data): Promise<void> {
    const swalOptions = this.getSwalDeleteOptions(`${data.libelle}`);
    const result = await Swal.fire(swalOptions);

    if (result.isConfirmed) {
      await this.confirmDeleteEntrepot(data);
    }
  }

  public getSwalDeleteOptions(username: string): SweetAlertOptions {
    return {
      title: this.translate.instant("FORM_ENTREPOT.DELETE_CONFIRMATION.title"),
      html: this.translate.instant("FORM_ENTREPOT.DELETE_CONFIRMATION.message", {
        username: username,
      }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#569C5B",
      cancelButtonColor: "#dc3545",
      cancelButtonText: this.translate.instant(
        "FORM_ENTREPOT.DELETE_CONFIRMATION.cancelButton",
      ),
      confirmButtonText: this.translate.instant(
        "FORM_ENTREPOT.DELETE_CONFIRMATION.confirmButton",
      ),
    };
  }

  public async getUserAction(Entrepot): Promise<any> {
    return handleDeleteUsers(
      () => from (this.EntrepotService.deleteEntrepot(Entrepot.id)),
      this.notyfService,
    );
  }

  public async confirmDeleteEntrepot(data): Promise<void> {
    try {
      this.response = await this.getUserAction(data);
      await this.loadAllHistoryEntrepot();
    } catch (err) {
      throw err;
    }
  }


  public getCellValue(field: string, module: any): string {
    if (!field) return "";
    const fieldParts = field.split(".");
    let value = module;
    for (const part of fieldParts) {
      value = value ? value[part] : "";
    }
    return value;
  }
}
