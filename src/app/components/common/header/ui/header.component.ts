import { Component, OnInit } from "@angular/core";
import { CommonModule, DatePipe, NgClass, NgIf } from "@angular/common";
import { EnvService } from "src/app/shared/services/env.service";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { IndexedDbService } from "@/shared/services/indexed-db.service";
import { EncodingDataService } from "@/shared/services/encoding-data.service";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { AuthService } from "@/pages/authentication/data-access/services/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        MatButtonModule,
        MatMenuModule,
        TranslateModule,
        CommonModule
    ],
})
export class HeaderComponent implements OnInit {
  public isSticky: boolean = false;
  public data: any = {};
  public isToggled = false;
  public envDeployment: string = "";
  public currentLanguage: string;
  public accountInfo: any;
  constructor(
    private datePipe: DatePipe,
    private db: IndexedDbService,
    private store: EncodingDataService,
    private translate: TranslateService,
    private envService: EnvService,
    private authService : AuthService,
    private router: Router,
  ) {
    this.envDeployment = this.envService.environmentDeployment;
    this.currentLanguage = this.translate.getDefaultLang();
  }

  currentDate: Date = new Date();
  formattedDate: string | null = this.currentDate
    ? this.datePipe.transform(this.currentDate, "dd MMMM yyyy", "fr")
    : null;

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.translate.reloadLang(lang);
    this.currentLanguage = lang;
    this.store.saveData("lang", lang);
  }

  public ngOnInit() {
    this.db.getData("sessionUser").then((response) => {
      this.accountInfo = response;
    });

  }

  logout() {
    localStorage.clear();
    this.authService.logout();
  }
}
